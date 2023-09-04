import React from "react";

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
      {/* 这里，当用户点击 "❌" 按钮时，箭头函数 () => onDeleteItems(item.id) 会被执行，从而触发 onDeleteItems，也就是 handleDeleteItems 函数，并传递 item.id 作为参数。
            因此，onDeleteItems 在这里实际上是作为一个 onClick 事件的一部分被触发的。每当你点击这个 "❌" 按钮，onDeleteItems 就会被执行，它会调用 handleDeleteItems 函数，并传递相应的 item.id，从而删除该 */}
    </li>
  );
}
export default Item;
