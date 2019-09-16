import React from "react";
import snakeImg from "../assets/Snake.png";
import snakeImg2 from "../assets/SnakeFlip.png";

export default function SnakeItem(props) {
  const { point, bgImage } = props;

  let backgroundPosition = bgImage;
  let useImage = snakeImg;
  if (point.direction == "UP") {
    useImage = snakeImg2;
  }
  return (
    <div>
      <div
        className="Snake"
        style={{
          position: "absolute",
          height: "16px",
          width: "16px",
          backgroundImage: `url(${useImage})`,
          top: `${point.position[1]}px`,
          left: `${point.position[0]}px`,
          backgroundPosition: `${backgroundPosition[0]}px ${
            backgroundPosition[1]
          }px`
        }}
      ></div>
    </div>
  );
}
