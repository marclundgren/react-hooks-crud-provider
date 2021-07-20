import React from "react";

import Posts from "./Posts";

import { fetchPosts } from "./usePosts";

export default function TestPosts() {
  return (
    <Posts
      dataProvider={() => {
        return fetchPosts().then((resp) => {
          return {
            data: [{ ...resp.data[0], title: "mocked..." }]
          };
        });
      }}
    />
  );
}
