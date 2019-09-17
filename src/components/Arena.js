import React from 'react'
import Snake from './Snake'
import Food from './Food'



class Arena extends React.Component {

    render() {

        const { snakePoints, intersections, height, width, foodPosition } = this.props

        return (<div id="arena"
            style={
                {
                    height: `${height - 300}px`,
                    width: `${width - 10}px`
                }
            }
            className='Arena'>
            <Food
                foodPosition={foodPosition}
            />
            <Snake
                snakePoints={snakePoints}
                intersections={intersections}
            />

        </div>)
    }
}

export default Arena