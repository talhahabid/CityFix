import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return { signOut };
};