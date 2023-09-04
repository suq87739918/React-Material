import React from "react";

export default function Stats({ items }) {
  if (items.length === 0) {
    return (
      <p className="stats">
        <em>Start adding items to your packing list</em>
      </p>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const ratio = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {ratio === 100
          ? "You have everything, ready to go"
          : `🧳 You have ${numItems} items on your list and you already packed ${numPacked} (${ratio}%)`}
      </em>
    </footer>
  );
}
