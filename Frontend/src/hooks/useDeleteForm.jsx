import { useAuthContext } from "./useAuthContext";
import { useApi } from "./useApi";
const apiBaseUrl = import.meta.env.VITE_API_URL;

export const useDeleteForm = () => {
  const { user } = useAuthContext();
  const { loading, error, makeApiCall } = useApi();
  const deleteForm = async (_id) => {
    if (!user) return;

    await makeApiCall(() =>
      fetch(`${apiBaseUrl}citizen/deleteForm/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
    );
  };

  return { deleteForm, loading, error };
};