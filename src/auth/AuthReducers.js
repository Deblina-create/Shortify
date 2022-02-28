export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_ACTION":
      return {
        ...state,
        email: action.payload.email
      };
    case "FETCH_HISTORY":
      return {
        ...state,
        urlHistory: action.payload.urlHistory
      }
    default:
      return state;
  }
};

export default AuthReducer;
