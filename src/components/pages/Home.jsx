import UserResults from '../users/UserResults'
import UserSearch from '../users/UserSearch'

function Home() {
  return (
    <>
      <UserSearch />
      <UserResults />
      {/* {process.env.REACT_APP_GITHUB_URL}
      {process.env.REACT_APP_GITHUB_TOKEN} */}
    </>
  )
}

export default Home
