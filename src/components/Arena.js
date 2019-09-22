import React from 'react'
import Snake from './Snake'
import Food from './Food'



class Arena extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const arena = document.getElementById('arena')
        arena.addEventListener('touchstart', (e) => {
            e.preventDefault()
            var touch = e.touches[0]
            if (touch.pageY > 200 && touch.pageX > 200) {
                this.updateDirection('DOWN')
            }
            if (touch.pageY < 200 && touch.pageX < 200) {
                this.updateDirection('UP')
            }
        })
    }

    updateDirection(direction) {
        this.props.changeDirection(direction)
    }
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