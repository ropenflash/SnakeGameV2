import React from 'react'
import Arena from './Arena'
import Control from './Control'

function generateRandomPosition() {
    let min = 100
    let max = 900
    min = Math.floor(((Math.random() * max - min) + min) / 2)
    max = Math.floor(((Math.random() * max - min) + min) / 2)

    return [max, min]
    // return [0, 1]
}




export default class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            snakePoints: [{ position: [0, 0], direction: 'RIGHT' }, { position: [16, 0], direction: 'RIGHT' }, { position: [32, 0], direction: 'RIGHT' },
            { position: [48, 0], direction: 'RIGHT' }, { position: [64, 0], direction: 'RIGHT' },
            { position: [80, 0], direction: 'RIGHT' }],
            direction: 'RIGHT',
            distanceSpeed: 10,
            interval: 100,
            intersections: [],
            foodPosition: generateRandomPosition(),

        }
        this.interval = null
    }
    componentDidMount() {
        const { interval } = this.state
        this.interval = setInterval(this.moveSnake, interval)
        document.onKeyDown = this.onKeyDown


    }
    changePosition(newHead) {
        let snakePoints = [...this.state.snakePoints]
        snakePoints.push(newHead)
        snakePoints.shift()
        this.setState({ snakePoints: snakePoints })
    }

    moveSnake = () => {
        const { direction } = this.state
        let snakePoints = [...this.state.snakePoints]
        let head = snakePoints[snakePoints.length - 1]

        let newHead = {}
        switch (direction) {

            case 'RIGHT':
                newHead.position = [(head.position[0] + 16) % 1536, head.position[1]]
                newHead.direction = "RIGHT"
                this.changePosition(newHead)
                break

            case 'UP':
                newHead.position = [head.position[0], head.position[1] - 16]
                newHead.direction = "UP"
                this.changePosition(newHead)
                break

            case 'LEFT':
                newHead.position = [head.position[0] - 16, head.position[1]]
                newHead.direction = "LEFT"
                this.changePosition(newHead)
                break

            case 'DOWN':
                newHead.position = [head.position[0], (head.position[1] + 16) % 448]
                newHead.direction = "DOWN"
                this.changePosition(newHead)
                break

        }
        // this.checkIfEatsFood()
    }
    changeDirection(newDirection) {

        this.setState({ direction: newDirection })
    }

    onKeyDown = (e, id) => {
        e = e || window.event

        switch (e.keyCode || id) {
            case 37: this.changeDirection('LEFT')
                break
            case 38: this.changeDirection('UP')
                break
            case 39: this.changeDirection('RIGHT')
                break
            case 40: this.changeDirection('DOWN')
                break

        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    checkIfEatsFood() {
        const { snakePosition, foodPosition } = this.state

        let x = Math.abs(snakePosition[0] - foodPosition[0])
        let y = Math.abs(snakePosition[1] - foodPosition[1])

        if (x <= 10 && y <= 10) {
            // let newSnakelength = [...snakeLength, 1].sort()
            // this.setState({ snakeLength: newSnakelength })
            // this.setState({ foodPosition: generateRandomPosition() })
        }

    }
    render() {
        const { snakePoints, flipImage, intersections } = this.state
        const { setArenaHeightWidth } = this
        return (<div className="Game">
            <Arena
                snakePoints={snakePoints}
                flipImage={flipImage}
                intersections={intersections}
                setArenaHeightWidth={setArenaHeightWidth}
            />
            <Control onClick={this.onKeyDown} />
        </div >
        )
    }
}