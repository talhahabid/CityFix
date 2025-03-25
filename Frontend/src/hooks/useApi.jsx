import { useReducer } from "react";
import { apiReducer } from "../reducers/ApiReducer";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const useApi = () => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const makeApiCall = async (apiCall) => {
    dispatch({ type: "REQUEST_START" });

    try {
      const response = await apiCall();
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      dispatch({ type: "REQUEST_SUCCESS", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "REQUEST_FAILURE", payload: err.message });
      throw err;
    }
  };

  return { ...state, makeApiCall };
};