import React, { useState } from "react";
import { baseURL, createPost } from "./usePosts";

import "./CreatePost.css";

const defaultProps = {
  onSuccess: () => {}
};

export default function CreatePost(props) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { onSuccess } = { ...defaultProps, ...props };

  function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    createPost(baseURL, {
      title,
      body
    })
      .then(onSuccess)
      .finally(() => {
        setLoading(false);
        setTitle("");
        setBody("");
      });
  }

  return (
    <form className="create-post" onSubmit={onSubmit}>
      <input
        name="title"
        placeholder="title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        name="body"
        placeholder="body"
        required
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button type="submit" disabled={loading}>
        Create Post
      </button>
    </form>
  );
}
