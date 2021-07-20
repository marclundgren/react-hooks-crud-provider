import usePosts, { fetchPosts } from "./usePosts";
import CreatePost from "./CreatePost";
import Post from "./Post";

const defaultProps = {
  dataProvider: fetchPosts
};

export default function Posts(props) {
  const { dataProvider } = { ...defaultProps, ...props };
  const { posts, add, update, remove, reload, loading } = usePosts({
    // this is prop-drilling
    dataProvider
  });
  return (
    <>
      <CreatePost onSuccess={(response) => add(response.data)} />
      <br />
      <button type="button" onClick={reload} disabled={loading}>
        reload posts
      </button>
      <br />
      {posts.map((post) => (
        <div key={post.id}>
          <Post {...post} update={update} remove={remove} />
        </div>
      ))}
    </>
  );
}
