import { useState } from "react";
import "./styles.css";
import Posts from "./Posts";
import TestPosts from "./TestPosts";

export default function App() {
  const [testMode, setTestMode] = useState(false);

  return (
    <div className="App">
      <h1>Hello Posts</h1>

      <label>
        <input
          type="checkbox"
          value={testMode}
          onChange={() => setTestMode(!testMode)}
        />
        Test Mode
      </label>

      {!testMode && <Posts />}

      {testMode && <TestPosts />}
    </div>
  );
}
