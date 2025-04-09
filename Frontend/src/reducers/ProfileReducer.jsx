export const profileReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_DISABLED":
        return { ...state, disabled: !state.disabled };
      default:
        return state;
    }
  };
  