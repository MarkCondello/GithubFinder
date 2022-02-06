import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// const github = axios.create({ // DUDNT WORK 
//   baseUrl: GITHUB_URL,
//   withCredentials: true,
//   headers: {Authorization: `token ${GITHUB_TOKEN}`}
// })

export const searchUsers = async (user) => {
  const params = new URLSearchParams({
    q: user
  })
  return axios.get(`${GITHUB_URL}search/users?${params}`)
    .then((resp)=>{
      return resp.data.items
    })
}

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all(
    [
      axios.get(`${GITHUB_URL}users/${login}`),
      axios.get(`${GITHUB_URL}users/${login}/repos`)
    ]
  )
  // console.log({user, repos})
  return {
    user: user.data,
    repos: repos.data
  }
}
