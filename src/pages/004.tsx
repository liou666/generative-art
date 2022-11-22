import Pager from '@/components/Pager'

interface Point{
  x: number
  y: number
}
export default function CubicDisarray() {
  const [ref, ctx] = useInitCanvas({ isScale: false })
  const { pendingTask, startFrame, stopFrame } = useFrame({ isSuffix: true })

  const squareSize = 32
  const offset = 10
  const rotateMultiplier = 25
  const translateMultiplier = 15

  function drawSquare(width: number, height: number) {
    const c = ctx.current!
    c.beginPath()
    c.rect(-width / 2, -height / 2, width, height)
    c.stroke()
  }

  function draw(point: Point) {
    const { x, y } = point
    const c = ctx.current!
    const { width: size } = c.canvas
    let leftOrRight = Math.random() > 0.5 ? 1 : -1
    c.save()
    const randomTranslate = x / size * Math.random() * translateMultiplier * leftOrRight
    c.translate(y + randomTranslate + offset, x + offset)
    leftOrRight = Math.random() > 0.5 ? 1 : -1
    const randomRotate = x / size * Math.random() * Math.PI / 180 * rotateMultiplier * leftOrRight
    c.rotate(randomRotate)
    drawSquare(squareSize, squareSize)
    c.restore()
  }

  function start() {
    stopFrame()
    const c = ctx.current!
    const { width: size } = c.canvas
    c.clearRect(0, 0, size, size)
    for (let y = squareSize; y < size - squareSize; y += squareSize) {
      for (let x = squareSize; x < size - squareSize; x += squareSize)
        pendingTask.push(() => draw({ x, y }))
    }
    startFrame()
  }

  useMount(start)

  return (
    <Pager>
      <canvas
        p-10
        border-album
        onClick={() => start()}
        ref={ref}
      />
    </Pager>
  )
}
