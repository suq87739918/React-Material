import React from "react";
import Button from "./Button";

export default function Friend({ friend, onSelection, selectedFriend }) {
  const isSelect = friend.id === selectedFriend?.id;
  return (
    <li className={isSelect ? "selected" : ""}>
      <img src={friend.img} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owe you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and your friends are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelect ? "Close" : "Select"}
      </Button>
    </li>
  );
}
