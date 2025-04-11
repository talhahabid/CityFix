import { useState } from 'react';

export const useDeleteForm = () => {
  const [error, setError] = useState(null);

  const deleteForm = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/forms/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { deleteForm, error };
};
