import React from "react";

export default function ScrollTest() {
  const elementScrollData = (value) => {
    console.log("elementScrollData ", value);
  };
  return (
    <div className="overflow-scroll h-10" onScroll={elementScrollData}>
      Scroll element Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Assumenda culpa tenetur molestiae nesciunt, ducimus, inventore eos cum
      odit vel, praesentium ratione. Tenetur veritatis enim ipsam, culpa
      similique ad ipsum atque!
    </div>
  );
}
