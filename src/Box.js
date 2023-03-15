import React from "react";

export default function Box(props) {
  return (
    <div className="box" onClick={() => props.toggle(props.id)}>
      {props.st}
    </div>
  );
}
