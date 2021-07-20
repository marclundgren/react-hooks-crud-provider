import React from "react";

import Posts from "./Posts";

import { dataProvider } from "./usePosts";

export default function TestPosts() {
  return (
    <Posts
      dataProvider={() => {
        return dataProvider().then((resp) => {
          return {
            data: [
              {
                ...resp.data[0],
                title: "get request mocked...",
                body: "I'm not sure what to do if i want to mock the create, edit or removal endpoints, yet. Perhaps the Context API will solve this problem",
              },
            ],
          };
        });
      }}
    />
  );
}
