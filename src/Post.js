import "./Post.css";

export default function Post(props) {
  return (
    <div className="post">
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <button
        type="button"
        onClick={() => {
          props.update({
            id: props.id,
            title: "Hello World!",
            body: "This is an updated post."
          });
        }}
      >
        update [{props.id}]
      </button>
      <button
        type="button"
        onClick={() => props.remove({ id: props.id })}
        disabled={props.removing}
      >
        remove [{props.id}]
      </button>
    </div>
  );
}
