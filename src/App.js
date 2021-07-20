import { useState } from "react";
import "./styles.css";
import Posts from "./Posts";
import TestPosts from "./TestPosts";

export default function App() {
  const [dataSelection, setDataSelection] = useState("live");

  return (
    <div className="App">
      <h1>Hello Posts</h1>

      <select
        value={dataSelection}
        onChange={(e) => setDataSelection(e.target.value)}
      >
        <option value="live">Live Data</option>
        <option value="test-provider">Test Mode (Data Provider pattern)</option>
        <option value="test-context">
          Test Mode (Context API) coming soon
        </option>
      </select>

      {dataSelection === "live" && <Posts />}

      {dataSelection === "test-provider" && <TestPosts />}

      {dataSelection === "test-context" && <p> coming soon </p>}
    </div>
  );
}
