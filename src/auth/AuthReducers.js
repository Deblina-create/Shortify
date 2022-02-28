export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_ACTION":
      console.log("Sign In action", action)
      return {
        ...state,
        email: action.payload.email
      };
    case "FETCH_HISTORY":
      console.log("Fetch history state", state)
      console.log("Fetch history action", action)
      return {
        ...state,
        urlHistory: action.payload.urlHistory
      }
    default:
      return state;
  }
};

export default AuthReducer;
