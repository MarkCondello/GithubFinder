const githubReducer = (state, action) => {
  // console.log('reached githubReduced', {action})
  switch(action.type) {
    // get initial users (testing purposes)
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
    }
    // I added this here
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        loading: false
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
export default githubReducer;
// https://www.robinwieruch.de/javascript-reducer/