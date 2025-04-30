"use client";
import React from "react";
import useGetData from "../hook/useGetData";
import useGetDataId from "../hook/useGetDataByID";
import usePostData from "../hook/usePostData";
import { Post } from "../hook/usePostData";
import usePutData from "../hook/usePutData";
import useDeleteData from "../hook/useDeleteData";
// import FetchData from '../components/FetchData'

export default function page() {
  const { data, fetchData, loading } = useGetData();
  const { data: dataId, loading: loadingId } = useGetDataId("1");
  const { PostData, loading: loadingPost } = usePostData();
  const { PutData } = usePutData();
  const { DeleteData } = useDeleteData();

  const handleEdit = async () => {
    const newPost = {
      title: "Old 4444444",
      // views: 200,
    };

    await PutData("da66", newPost);
    fetchData();
  };

  const handleDelete = async () => {
    await DeleteData("c2cb");
    fetchData();
  };

  const handleCreate = async () => {
    const newPost: Post = {
      title: "New Post",
      views: 0,
    };

    await PostData(newPost);
    fetchData();
  };
  return (
    <>
      <div className="">
        <h2>Method : Get</h2>
        {/* <FetchData/> */}
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {data.map((item) => (
              <div key={item.id}>
                <span>{`${item?.id}. ${item?.title ?? "defualt"} (${
                  item?.views
                })`}</span>
              </div>
            ))}
          </>
        )}
      </div>
      <br />
      <div className="">
        <h2>Method : Get : id</h2>
        {/* <FetchData/> */}
        {loadingId ? (
          <>Loading...</>
        ) : (
          <div>
            {`
            ${dataId?.id}.
             ${dataId?.title}
             (${dataId?.views})`}
          </div>
        )}
      </div>
      <br />
      <div>
        <button
          className="border rounded p-2"
          type="button"
          onClick={handleCreate}
        >
          Create Post
        </button>
        <button
          className="border rounded p-2"
          type="button"
          onClick={handleEdit}
        >
          Put
        </button>
        {/* <input type="text" /> */}
        <button
          className="border rounded p-2"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
}
