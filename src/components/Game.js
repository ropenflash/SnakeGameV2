import React from 'react'
import Arena from './Arena'
import Control from './Control'
import UIfx from 'uifx'
import EatSound from '../assets/eat.mp3'

const eatSound = new UIfx(EatSound)

function generateRandomPosition(max, min) {

    min = Math.floor(((Math.random() * min - 0) + 16) / 2) * 2
    max = Math.floor(((Math.random() * max - 0) + 16) / 2) * 2
    min = (Math.floor(min / 16)) * 16
    max = (Math.floor(max / 16)) * 16
    return [max, min]
    // return [0, 1]
}


const initialState = [{ position: [0, 0], direction: 'RIGHT' }, { position: [16, 0], direction: 'RIGHT' }]

export default class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            snakePoints: initialState,
            direction: 'RIGHT',
            distanceSpeed: 10,
            interval: 300,
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
        this.addAudio()
        this.setTouchEvents()
        document.onkeydown = this.onKeyDown



    }
    setTouchEvents() {
        const arena = document.getElementById('arena')
        arena.addEventListener('touchstart', handleArenaTouch.bind(this))


        function handleArenaTouch(e) {
            const touch = e.touches[0]
            const { direction: oldDirection, snakePoints } = this.state
            let head = snakePoints[snakePoints.length - 1].position

            if (oldDirection === 'RIGHT' || oldDirection === "LEFT") {
                if (touch.pageY > head[1]) {
                    this.changeDirection('DOWN')
                }
                else {
                    this.changeDirection('UP')
                }
            }
            if (oldDirection === 'UP' || oldDirection === "DOWN") {
                if (touch.pageX > head[0]) {
                    this.changeDirection('RIGHT')
                }
                else {
                    this.changeDirection('LEFT')
                }
            }
        }
    }
    addAudio() {
        var eat = document.createElement('audio')
        eat.src = EatSound
        eat.id = 'eat'
        document.body.appendChild(eat)
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
        this.checkIfCollides()
    }
    changeDirection = (newDirection) => {

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
            let tail = { position: [-16, -16], direction: this.state.direction }
            // eatSound.setVolume(0.2).play()
            var eat = document.getElementById('eat')
            eat.play()
            newSnakePoints.unshift(tail)
            this.setState({ snakePoints: newSnakePoints })
            this.setState({ foodPosition: generateRandomPosition(this.state.width, this.state.height - 320) })
        }

    }
    checkIfCollides() {
        const { snakePoints } = this.state
        let newSnakePoints = snakePoints.slice()
        let head = snakePoints[snakePoints.length - 1]
        newSnakePoints.pop()
        // console.log(head.position[0])
        // console.log(newSnakePoints)
        newSnakePoints.forEach(point => {

            if (point.position[0] === head.position[0] && point.position[1] == head.position[1]) {
                alert('Game Over')
                this.setState({ snakePoints: initialState, direction: 'RIGHT' })
            }
        })
    }
    render() {
        const { snakePoints, flipImage, intersections, height, width, foodPosition } = this.state
        const { changeDirection } = this
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
                changeDirection={changeDirection}
            />
            <Control
                height={height}
                onClick={this.onKeyDown} />
        </div >
        )
    }
}