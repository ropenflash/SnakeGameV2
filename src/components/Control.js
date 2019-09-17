import React, { useEffect } from 'react'

function Control(props) {
    useEffect(() => {

        class Controls {
            constructor() {
                let control = document.getElementById('control')
                control.onclick = this.onClick
            }

            onClick = (event) => {
                props.onClick(event, parseInt(event.target.dataset.action))
            }
        }
        new Controls()
    })
    return (<div id='control' className="controls">
        <button className="left" data-action="37">LEFT</button>
        <button className="up" data-action="38">UP</button>
        <button className="right" data-action="39">RIGHT</button>
        <button className="down" data-action="40">DOWN</button>
    </div>
    )
}

export default React.memo(Control)