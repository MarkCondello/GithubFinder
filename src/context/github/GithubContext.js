import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext(); // needs to be exported so its value items can be imported from other compnents
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)
  const setLoading = () => dispatch({type: 'SET_LOADING'})
  // fetchUsers is for testing purposes
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}users`,
    {headers: { Authorization: `token ${GITHUB_TOKEN}`}})
    const data = await response.json()
    dispatch({ // dispatches to the githubReducer
      type: 'GET_USERS',
      payload: data
    })
  }
  const searchUsers = async (user) => {
    // console.log('reached searchUsers', {user}, user)
    setLoading()
    const params = new URLSearchParams({q: user})
    const response = await fetch(`${GITHUB_URL}search/users?${params}`, 
    {headers: {Authorization: `token ${GITHUB_TOKEN}`}})
    const {items} = await response.json() // destructure items from data
    dispatch({ // dispatches to the githubReducer
      type: 'SET_USERS',
      payload: items
    })
  }
  const getUser = async (user) => {
    setLoading()
    // const params = new URLSearchParams({q: user})
    const response = await fetch(`${GITHUB_URL}users/${user}`,
    {headers: { Authorization: `token ${GITHUB_TOKEN}`}})
    if (response.state === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json() // destructure items from data
      dispatch({ // dispatches to the githubReducer
        type: 'GET_USER',
        payload: data
      })
    }
  }
  const getUserRepos = async (user) => {
    // console.log('reached searchUsers', {user}, user)
    setLoading()
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })
    const response = await fetch(`${GITHUB_URL}users/${user}/repos?${params}`,
    {headers: {Authorization: `token ${GITHUB_TOKEN}`}})
    const data = await response.json() // destructure items from data
    dispatch({ // dispatches to the githubReducer
      type: 'GET_REPOS',
      payload: data
    })
  }
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  return <GithubContext.Provider value={{
    users: state.users,
    user: state.user,
    loading: state.loading,
    searchUsers,
    fetchUsers,
    clearUsers,
    getUser,
    setLoading,
    repos: state.repos,
    getUserRepos,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext;