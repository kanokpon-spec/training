import { useEffect, useState } from "react";

const endpoint = "http://localhost:3000/posts";

export default function useDeleteData() {
  const [loading, setLoading] = useState<boolean>(false);

  const DeleteData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(endpoint, result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { DeleteData, loading };
}
