import Pager from '@/components/Pager'

interface Point{
  x: number
  y: number
}

export default function Wave() {
  const [ref, ctx] = useInitCanvas({ isScale: false })
  const { pendingTask, startFrame, stopFrame } = useFrame()
  const step = 12

  function genData(step: number) {
    const c = ctx.current!
    const { width: size } = c.canvas
    const lines = []
    for (let i = step; i < size; i += step) {
      const line = []
      for (let j = step; j <= size; j += step) {
        const distanceToCenter = Math.abs(j - size / 2)
        const variance = Math.max(size / 2 - 50 - distanceToCenter, 0)
        const random = Math.random() * variance / 2 * -1
        const point = { x: j, y: i + random }
        line.push(point)
      }
      lines.push(line)
    }
    return lines
  }

  function draw(line: Point[]) {
    const c = ctx.current!
    c.beginPath()
    c.moveTo(line[0].x, line[0].y)
    for (let j = 0; j < line.length - 2; j++) {
      const xc = (line[j].x + line[j + 1].x) / 2
      const yc = (line[j].y + line[j + 1].y) / 2
      c.quadraticCurveTo(line[j].x, line[j].y, xc, yc)
    }
    c.save()
    c.globalCompositeOperation = 'destination-out'
    c.fill()
    c.restore()
    c.stroke()
  }

  function start() {
    stopFrame()
    const c = ctx.current!
    const { width, height } = c.canvas
    c.clearRect(0, 0, width, height)
    const lines = genData(step)
    for (let i = 3; i < lines.length; i++)
      pendingTask.push(() => draw(lines[i]))
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
