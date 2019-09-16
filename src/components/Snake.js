import React from 'react'
import SnakeItem from './SnakeItem'


function Snake(props) {
    const { snakePoints } = props
    let bgImage

    let length = snakePoints.length
    return (
        snakePoints.map((point, index) => {
            switch (point.direction) {
                case 'RIGHT': bgImage = setBGImage(index, length, [-16, -16], [-16, -48], [-16, 0])
                    break
                case 'LEFT': bgImage = setBGImage(index, length, [-48, -16], [-16, -48], [-48, 0])
                    break
                case 'UP': bgImage = setBGImage(index, length, [-32, -32], [0, 0], [-32, -48])
                    break
                case 'DOWN': bgImage = setBGImage(index, length, [-32, -16], [0, -48], [-32, 0])
                    break
            }
            return <SnakeItem
                point={point}
                bgImage={bgImage} />
        })
    )
}

function setBGImage(index, length, tail, mid, head) {
    if (index === 0) {
        return tail
    }
    else if (index === length - 1) {
        return head
    }
    else {
        return mid
    }
}

export default Snake