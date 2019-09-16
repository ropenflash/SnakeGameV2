import React from 'react'
import Snake from './Snake'

export default class Arena extends React.Component {
    render() {
        const { snakePoints, intersections } = this.props
        return (<div className='Arena'>
            <Snake
                snakePoints={snakePoints}
                intersections={intersections}
            /></div>)
    }
}