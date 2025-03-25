export const apiReducer = (state, action) => {
    switch (action.type) {
      case "REQUEST_START":
        return { ...state, loading: true, error: null };
      case "REQUEST_SUCCESS":
        return { ...state, loading: false, data: action.payload, error: null };
      case "REQUEST_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };