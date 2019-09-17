import React from 'react'
import Arena from './Arena'
import Control from './Control'

let clientHeight
let clientWidth

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
            width: 0,
            height: 0,

        }
        this.interval = null
        this.clientHeight = 450
        this.clientWidth = 1536
    }
    componentDidMount() {
        const { interval } = this.state
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.interval = setInterval(this.moveSnake, interval)
        document.onkeydown = this.onKeyDown


    }
    updateWindowDimensions = () => {
        this.setState({ height: window.innerHeight, width: window.innerWidth })
    }
    changePosition(newHead) {
        let snakePoints = [...this.state.snakePoints]
        snakePoints.push(newHead)
        snakePoints.shift()
        this.setState({ snakePoints: snakePoints })
    }

    moveSnake = () => {
        const { direction, width, height } = this.state
        let snakePoints = [...this.state.snakePoints]
        let head = snakePoints[snakePoints.length - 1]

        let newHead = {}
        switch (direction) {

            case 'RIGHT':
                newHead.position = [(head.position[0] + 16) % (width - 10), head.position[1]]
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
                newHead.position = [head.position[0], (head.position[1] + 16) % (height - 310)]
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
        window.removeEventListener('resize', this.updateWindowDimensions)
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
        const { snakePoints, flipImage, intersections, height, width } = this.state

        return (<div className="Game">
            <Arena
                snakePoints={snakePoints}
                flipImage={flipImage}
                intersections={intersections}
                height={height}
                width={width}
            />
            <Control onClick={this.onKeyDown} />
        </div >
        )
    }
}