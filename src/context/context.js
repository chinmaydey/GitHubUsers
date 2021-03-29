import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const rootUrl = "https://api.github.com";
const status = "fulfilled";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "" });

  const checkRequests = () => {
    setIsLoading(true);

    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        //console.log(data);
        let {
          rate: { remaining },
        } = data;

        //console.log(remaining);
        setRequests(remaining);

        if (remaining === 0) {
          setError({ isError: true, msg: "Request limit reached!" });
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };

  const SearchGithubUser = async (user) => {
    setIsLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);

      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        const [repos, followers] = results;

        if (followers.status === status) {
          setFollowers(followers.value.data);
        }
      });
    }

    checkRequests();

    setIsLoading(false);
  };

  useEffect(() => {
    checkRequests();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        followers,
        requests,
        error,
        SearchGithubUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
