import React from 'react'
import SnakeItem from './SnakeItem'



function Snake(props) {
    const { snakePoints } = props
    let bgImage

    let length = snakePoints.length
    return (
        snakePoints.map((point, index, arr) => {
            // console.log(arr[index])

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


            // if (index > 0) {
            //     let j = index - 1
            //     if (point.direction == arr[j.direction]) {
            //         bgImage = setBGImage(index, length, [-48, -16], [-64, -64], [-48, 0])
            //     }

            // }

            if (index < arr.length - 1) {
                let j = index + 1

                if (point.direction !== arr[j].direction) {

                    if (point.direction === 'LEFT' && arr[j].direction === 'DOWN')
                        bgImage = setBGImage(index, length, [-32, -16], [-16, -32], [-48, 0])


                    if (point.direction === 'LEFT' && arr[j].direction === 'UP') {
                        bgImage = setBGImage(index, length, [0, -16], [0, -32], [-48, 0])
                    }
                    if (arr[j].direction === 'RIGHT' && point.direction === 'DOWN')
                        bgImage = setBGImage(index, length, [-16, -16], [0, -32], [-48, 0])

                    if (arr[j].direction === 'DOWN' && point.direction === 'RIGHT')
                        bgImage = setBGImage(index, length, [-32, -16], [-32, -32], [-48, 0])

                    if (arr[j].direction === 'UP' && point.direction === 'RIGHT') {

                        bgImage = setBGImage(index, length, [-48, -32], [-48, -32], [-48, 0])
                    }
                    if (arr[j].direction === 'LEFT' && point.direction === 'DOWN') {
                        bgImage = setBGImage(index, length, [-48, -16], [-48, -32], [-48, 0])
                    }

                    if (arr[j].direction === 'LEFT' && point.direction === 'UP')
                        bgImage = setBGImage(index, length, [-48, -32], [-48, -16], [-48, 0])


                    if (arr[j].direction === 'RIGHT' && point.direction === 'UP')
                        bgImage = setBGImage(index, length, [-16, -32], [0, -16], [-48, 0])
                }
            }
            return <SnakeItem key={index}
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