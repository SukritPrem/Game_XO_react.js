import React from "react";

export default function Box(props) {
  return (
    <div className="box" onClick={() => props.toggle(props.id)}>
      <div className="text">{props.st}</div>
    </div>
  );
}
