import { useAuthContext } from "./useAuthContext";
import { useApi } from "./useApi";
const apiBaseUrl = import.meta.env.VITE_API_URL;

export const useDeleteForm = () => {
  const { user } = useAuthContext();
  const { loading, error, makeApiCall } = useApi();

  const deleteForm = async (_id) => {
    if (!user) return false;

    try {
      const response = await makeApiCall(() =>
        fetch(`${apiBaseUrl}citizen/deleteForm/${_id}`, { // Changed from citizen to council
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwtToken}`,
          },
        })
      );

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  return { deleteForm, loading, error };
};