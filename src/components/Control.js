import React from 'react'

export default function Control(props) {
    return (<div className="controls">
        <button className="left" onClick={(e) => { props.onClick(e, 37) }}>LEFT</button>
        <button className="up" onClick={(e) => { props.onClick(e, 38) }}>UP</button>
        <button className="right" onClick={(e) => { props.onClick(e, 39) }}>RIGHT</button>
        <button className="down" onClick={(e) => { props.onClick(e, 40) }}>DOWN</button>
    </div>
    )
}