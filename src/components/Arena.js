import React from 'react'
import Snake from './Snake'




export default class Arena extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {

        const { snakePoints, intersections } = this.props

        return (<div id="arena" className='Arena'>
            <Snake
                snakePoints={snakePoints}
                intersections={intersections}
            /></div>)
    }
}