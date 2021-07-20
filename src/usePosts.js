import { useState, useEffect } from "react";
import axios from "axios";

import delay from "./util/delay";

export const baseURL = "https://jsonplaceholder.typicode.com/posts";

// axios wrappers. exported for a component like CreatePost
export const fetchPosts = (url) => axios.get(url);
export const removePost = (url) => axios.delete(url);
export const createPost = (url, body) => axios.post(url, body);
export const updatePost = (url, body) => axios.get(url, body);

const defaultProps = {
  dataProvider: () => fetchPosts(baseURL)
  // what about remove, create, update?
};

export default function usePosts(props) {
  const [posts, setPosts] = useState([]);
  const [cached, setCached] = useState();
  const [loading, setLoading] = useState(false);

  const { dataProvider } = { ...defaultProps, ...props };

  function reload() {
    setCached(null);
  }

  function add(post) {
    setPosts([post, ...posts]);
  }

  function update({ id, title, body }) {
    updatePost(`${baseURL}/${id}`, {
      title,
      body
    }).then((response) => {
      setPosts(
        posts.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              ...response,
              title,
              body
            };
          }
          return p;
        })
      );
    });
  }

  function remove({ id }) {
    removePost(`${baseURL}/${id}`).then(async () => {
      setPosts(
        posts.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              removing: true
            };
          }
          return p;
        })
      );
      await delay(1000);
      setPosts(posts.filter((p) => p.id !== id));
    });
  }

  useEffect(() => {
    if (cached) {
      setPosts(cached);
    } else {
      setLoading(true);
      dataProvider().then((response) => {
        const { data } = response;
        setCached(data.reverse());
        setPosts(data.reverse());
        setLoading(false);
      });
    }
  }, [dataProvider, cached]);

  return {
    posts,
    add,
    update,
    remove,
    loading,
    reload
  };
}
