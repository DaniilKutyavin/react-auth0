import React from "react";

export default function Home({ auth }) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={auth.login}>Log In</button>
    </div>
  );
}
