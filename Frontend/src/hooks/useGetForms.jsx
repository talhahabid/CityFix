import { useAuthContext } from "./useAuthContext";
import { useApi } from "./useApi";
const apiBaseUrl = import.meta.env.VITE_API_URL;
export const useGetForm = () => {
  const { user } = useAuthContext();
  const { loading, error, makeApiCall } = useApi();

  const getForms = async () => {
    if (!user) return;

    try {
      const data = await makeApiCall(() =>
        fetch(`${apiBaseUrl}citizen/getForms`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        })
      );
      return data;
    } catch (err) {
      console.error("Failed to fetch forms", err);
      return [];
    }
  };

  return { getForms, loading, error };
};
