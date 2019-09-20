import React from 'react'
import Arena from './Arena'
import Control from './Control'
import UIfx from 'uifx'
import EatSound from '../assets/eat.wav'

const eatSound = new UIfx(EatSound)

function generateRandomPosition(max, min) {

    min = Math.floor(((Math.random() * min - 0) + 16) / 2) * 2
    max = Math.floor(((Math.random() * max - 0) + 16) / 2) * 2
    min = (Math.floor(min / 16)) * 16
    max = (Math.floor(max / 16)) * 16
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
            foodPosition: [0, 0],
            width: 0,
            height: 0,

        }
        this.interval = null

    }
    componentDidMount() {
        const { interval } = this.state
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.interval = setInterval(this.moveSnake, interval)
        document.onkeydown = this.onKeyDown


    }
    updateWindowDimensions = () => {
        this.setState({ height: window.innerHeight, width: window.innerWidth }, () => {
            this.setState({ foodPosition: generateRandomPosition(this.state.width, this.state.height - 320) })
        })

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
        let newX
        let newY
        let newHead = {}
        switch (direction) {

            case 'RIGHT':
                newX = (head.position[0] + 16) % (width - 16)
                newX = (Math.floor(newX / 16)) * 16
                newHead.position = [newX, head.position[1]]
                newHead.direction = "RIGHT"
                this.changePosition(newHead)
                break

            case 'UP':
                let y = head.position[1] - 16
                newY = y > 0 ? y : (height - 320 + y)
                newY = (Math.floor(newY / 16)) * 16
                newHead.position = [head.position[0], newY]
                newHead.direction = "UP"
                this.changePosition(newHead)
                break

            case 'LEFT':
                let x = head.position[0] - 16
                newX = x > 0 ? x : (width + x)
                newX = (Math.floor(newX / 16)) * 16
                newHead.position = [newX, head.position[1]]
                newHead.direction = "LEFT"
                this.changePosition(newHead)
                break

            case 'DOWN':
                newY = (head.position[1] + 16) % (height - 320)
                newY = (Math.floor(newY / 16)) * 16
                newHead.position = [head.position[0], newY]
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
        // console.log(x, y)

        if (x === 0 && y === 0) {
            let newSnakePoints = [...snakePoints]
            let head = newSnakePoints[newSnakePoints.length - 1]
            eatSound.setVolume(0.2).play()
            newSnakePoints.unshift(head)
            this.setState({ snakePoints: newSnakePoints })
            this.setState({ foodPosition: generateRandomPosition(this.state.width, this.state.height - 320) })
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