import { useEffect, useState } from "react";

export interface Post {
  // id: string;
  title: string;
  views: number;
}

const endpoint = "http://localhost:3000/posts";

export default function usePutData() {
  const [loading, setLoading] = useState<boolean>(false);

  const PutData = async (id: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(endpoint, result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { PutData, loading };
}
