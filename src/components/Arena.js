import React from 'react'
import Snake from './Snake'




export default class Arena extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {

        const { snakePoints, intersections, height, width } = this.props

        return (<div id="arena"
            style={
                {
                    height: `${height - 300}px`,
                    width: `${width - 10}px`
                }
            }
            className='Arena'>
            <Snake
                snakePoints={snakePoints}
                intersections={intersections}
            /></div>)
    }
}