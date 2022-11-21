import Pager from '@/components/Pager'

interface Point{
  x: number
  y: number
}

export default function TriangularMesh() {
  const [ref, ctx] = useInitCanvas({ isScale: false })
  const { pendingTask, startFrame, stopFrame } = useFrame({ isSuffix: true })

  function drawTriangle(pointA: Point, pointB: Point, pointC: Point) {
    const c = ctx.current!
    c.beginPath()
    c.moveTo(pointA.x, pointA.y)
    c.lineTo(pointB.x, pointB.y)
    c.lineTo(pointC.x, pointC.y)
    c.lineTo(pointA.x, pointA.y)
    c.closePath()
    const gray = Math.floor(Math.random() * 16).toString(16)
    c.fillStyle = `#${gray}${gray}${gray}`
    c.fill()
    c.stroke()
  }

  function genData(): Point[][] {
    const c = ctx.current!
    const { width: size } = c.canvas
    const gap = size / 8
    const lines: Point[][] = []
    let odd = false

    for (let y = gap / 2; y < size; y += gap) {
      odd = !odd
      const line: Point[] = []
      for (let x = gap / 4; x < size; x += gap) {
        const dot = { x: x + (odd ? gap / 2 : 0), y }
        line.push({ x: dot.x + (Math.random() * 0.8 - 0.4) * gap, y: dot.y + (Math.random() * 0.8 - 0.4) * gap })
      }
      lines.push(line)
    }
    return lines
  }

  function start() {
    stopFrame()
    const c = ctx.current!
    c.lineJoin = 'bevel'

    const { width, height } = c.canvas
    c.clearRect(0, 0, width, height)

    const lines = genData()
    let odd = true

    for (let y = 0; y < lines.length - 1; y++) {
      odd = !odd
      const trianglePoints: Point[] = []

      for (let j = 0; j < lines[y].length; j++) {
        trianglePoints.push(odd ? lines[y][j] : lines[y + 1][j])
        trianglePoints.push(odd ? lines[y + 1][j] : lines[y][j])
      }
      for (let i = 0; i < trianglePoints.length - 2; i++)
        pendingTask.push(() => drawTriangle(trianglePoints[i], trianglePoints[i + 1], trianglePoints[i + 2]))
    }
    startFrame()
  }

  useMount(() => {
    start()
  })

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
