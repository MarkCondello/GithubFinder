import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext(); // needs to be exported so its value items can be imported from other compnents
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)
  const setLoading = () => dispatch({type: 'SET_LOADING'})
  // fetchUsers is for testing purposes 
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}users`, 
    // {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`
    //   }
    // }
    )
    const data = await response.json()
    // console.log({data})
    dispatch({ // dispatches to the githubReducer
      type: 'GET_USERS',
      payload: data
    })
  }
  const searchUsers = async (user) => {
    // console.log('reached searchUsers', {user}, user)
    setLoading()
    const params = new URLSearchParams({
      q: user
    })
    const response = await fetch(`${GITHUB_URL}search/users?${params}`, 
    // {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`
    //   }
    // }
    )
    const {items} = await response.json() // destructure items from data
    dispatch({ // dispatches to the githubReducer
      type: 'SET_USERS',
      payload: items
    })
  }
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    searchUsers,
    fetchUsers,
    clearUsers,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext;