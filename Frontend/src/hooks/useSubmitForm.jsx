import { useAuthContext } from "./useAuthContext";
import { useApi } from "./useApi";
const apiBaseUrl = import.meta.env.VITE_API_URL;
export const useSubmitForm = () => {
  const { user, dispatch } = useAuthContext();
  const { loading, error, makeApiCall } = useApi();

  const submitForm = async (location, problemType, receiveNotification) => {
    if (!user) return;

    try {
      const data = await makeApiCall(() =>
        fetch(`${apiBaseUrl}/citizen/submit/${user.user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwtToken}`,
          },
          body: JSON.stringify({ location, problemType, receiveNotification }),
        })
      );

      return data;
    } catch (err) {
      console.error("Form Submit Failed:", err.message);
    }
  };

  return { submitForm, loading, error };
};
