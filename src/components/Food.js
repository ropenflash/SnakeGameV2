import React from "react";
import snakeImg from "../assets/Snake.png";

export default function Food(props) {
    const { foodPosition } = props;


    return (
        <div>
            <div
                className="Snake"
                style={{
                    position: "absolute",
                    height: "16px",
                    width: "16px",
                    backgroundImage: `url(${snakeImg})`,
                    top: `${foodPosition[1]}px`,
                    left: `${foodPosition[0]}px`,
                    backgroundPosition: `-32px -48px`
                }}
            ></div>
        </div>
    );
}
