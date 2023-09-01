import React from "react";

function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PachingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip</h3>
    </div>
  );
}

function PachingList() {
  return <div className="list">List</div>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
