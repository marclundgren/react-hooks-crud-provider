import { useState, useEffect } from "react";
import axios from "axios";

import delay from "./util/delay";

export const baseURL = "https://jsonplaceholder.typicode.com/posts";

// axios wrappers. exported for a component like CreatePost
export const fetchPosts = (url) => axios.get(url);
export const removePost = (url) => axios.delete(url);
export const createPost = (url, body) => axios.post(url, body);
export const updatePost = (url, body) => axios.get(url, body);
export const dataProvider = () => fetchPosts(baseURL);

const defaultProps = {
  dataProvider,
  // @todo what about remove, create, update?
};

export default function usePosts(props) {
  const [posts, setPosts] = useState([]);
  const [cached, setCached] = useState();
  const [loading, setLoading] = useState(false);

  const { dataProvider } = { ...defaultProps, ...props };

  async function reload() {
    setLoading(true);
    await delay(1500);
    setCached(null);
    setLoading(false);
  }

  async function add(post) {
    setLoading(true);
    await delay(1000);
    setPosts([post, ...posts]);
    setLoading(false);
  }

  async function update({ id, title, body }) {
    setLoading(true);
    await delay(1000);

    const response = await updatePost(`${baseURL}/${id}`, {
      title,
      body,
    });
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...response,
            title,
            body,
          };
        }
        return p;
      })
    );
    setLoading(false);
  }

  async function remove({ id }) {
    setLoading(true);
    await delay(1000);

    await removePost(`${baseURL}/${id}`);
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            removing: true,
          };
        }
        return p;
      })
    );
    await delay(1000);
    setPosts(posts.filter((p) => p.id !== id));
    setLoading(false);
  }

  useEffect(() => {
    if (cached) {
      setPosts(cached);
    } else {
      setLoading(true);
      dataProvider().then((response) => {
        const { data } = response;

        /*
        @todo consider a middleware that handles the response
        */
        const reveresedPosts = data.reverse(); // posts are sorted by time desc

        setCached(reveresedPosts);
        setPosts(reveresedPosts);
        setLoading(false);
      });

      // @todo abort on error
      // return () => abort();
    }
  }, [dataProvider, cached]);

  return {
    posts, // data
    loading, // state
    add, // action
    update, // action
    remove, // action
    reload, // action
  };
}
