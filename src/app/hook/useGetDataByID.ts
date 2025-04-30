import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  views: number;
}

const endpoint = "http://localhost:3000/posts";

export default function useGetDataId(id:string) {
  const [data, setData] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}/${id}`);
      const posts = await response.json();
      if (!response.ok) {
      }
      setData(posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { data, loading };
}
