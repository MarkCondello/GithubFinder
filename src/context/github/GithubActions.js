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

export const getUser = async (user) => {
  const response = await fetch(`${GITHUB_URL}users/${user}`,
  {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  }
  )
  if (response.state === 404) {
    window.location = '/notfound'
  } else {
    return await response.json()
  }
}

export const getUserRepos = async (user) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })
  const response = await fetch(`${GITHUB_URL}users/${user}/repos?${params}`, 
  {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  }
  )
  return await response.json()
}