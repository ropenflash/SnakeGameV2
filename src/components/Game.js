import React from 'react'
import Arena from './Arena'
import Control from './Control'


function generateRandomPosition() {
    let min = 96
    let max = 320
    // min = Math.floor(((Math.random() * max - min) + min) / 2)
    // max = Math.floor(((Math.random() * max - min) + min) / 2)

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
                newHead.position = [(head.position[0] + 16) % (width - 16), head.position[1]]
                newHead.direction = "RIGHT"
                this.changePosition(newHead)
                break

            case 'UP':
                let y = head.position[1] - 16
                newHead.position = [head.position[0], y > 0 ? y : (height - 320 + y)]
                newHead.direction = "UP"
                this.changePosition(newHead)
                break

            case 'LEFT':
                let x = head.position[0] - 16
                let newWidth = (Math.floor(width / 16)) * 16
                let newX = x > 0 ? x : (newWidth + x)
                newHead.position = [newX, head.position[1]]
                newHead.direction = "LEFT"
                this.changePosition(newHead)
                break

            case 'DOWN':
                newHead.position = [head.position[0], (head.position[1] + 16) % (height - 320)]
                newHead.direction = "DOWN"
                this.changePosition(newHead)
                break

        }
        this.checkIfEatsFood()
    }
    changeDirection(newDirection) {

        this.setState({ direction: newDirection })
    }

    onKeyDown = (e, id) => {
        e = e || window.event
        const oldDirection = this.state.direction
        switch (e.keyCode || id) {
            case 37: if (oldDirection !== 'RIGHT') this.changeDirection('LEFT')
                break
            case 38: if (oldDirection !== 'DOWN') this.changeDirection('UP')
                break
            case 39: if (oldDirection !== 'LEFT') this.changeDirection('RIGHT')
                break
            case 40: if (oldDirection !== 'UP') this.changeDirection('DOWN')
                break

        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    checkIfEatsFood() {
        const { snakePoints, foodPosition } = this.state
        let head = snakePoints[snakePoints.length - 1].position
        let x = Math.abs(head[0] - foodPosition[0])
        let y = Math.abs(head[1] - foodPosition[1])

        if (x <= 10 && y <= 10) {
            // let newSnakelength = [...snakeLength, 1].sort()
            // this.setState({ snakeLength: newSnakelength })
            this.setState({ foodPosition: generateRandomPosition() })
        }

    }
    render() {
        const { snakePoints, flipImage, intersections, height, width, foodPosition } = this.state

        return (<div style={{
            height: `${height}px`,
            width: `${width}px`
        }} className="Game">
            <Arena
                snakePoints={snakePoints}
                flipImage={flipImage}
                intersections={intersections}
                foodPosition={foodPosition}
                height={height}
                width={width}
            />
            <Control
                height={height}
                onClick={this.onKeyDown} />
        </div >
        )
    }
}