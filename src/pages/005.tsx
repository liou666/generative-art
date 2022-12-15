import Pager from '@/components/Pager'

interface Point{
  x: number
  y: number
}

export default function Deux() {
  const [ref, ctx] = useInitCanvas({ isScale: false })
  const { pendingTask, startFrame, stopFrame } = useFrame({ isSuffix: false })
  const [stepIndex, setStepIndex] = useState<number>(0)

  const steps = [20, 15, 10, 5]

  function draw({ x, y }: Point, width: number, height: number, position: number[]) {
    const c = ctx.current!
    c.save()
    c.translate(x, y)
    c.translate(width / 2, height / 2)
    c.rotate(Math.random() * 5)
    c.translate(-width / 2, -height / 2)
    for (let i = 0; i < position.length; i++) {
      c.beginPath()
      c.moveTo(position[i] * width, 0)
      c.lineTo(position[i] * width, height)
      c.stroke()
    }
    c.restore()
  }

  function start() {
    stopFrame()
    const c = ctx.current!
    const { width: size } = c.canvas
    c.clearRect(0, 0, size, size)
    pendingTask.length = 0
    const oneThird = size / 3
    const step = steps[stepIndex]
    for (let y = 0; y <= size; y += step) {
      for (let x = 0; x <= size; x += step) {
        if (y < oneThird)
          pendingTask.push(() => draw({ x, y }, step, step, [0.5]))
        else if (y < 2 * oneThird)
          pendingTask.push(() => draw({ x, y }, step, step, [0.2, 0.8]))
        else
          pendingTask.push(() => draw({ x, y }, step, step, [0.1, 0.5, 0.9]))
      }
    }
    startFrame()
  }

  function clickHandler() {
    if (stepIndex === steps.length - 1)
      setStepIndex(0)
    else
      setStepIndex(stepIndex + 1)
  }

  useEffect(start, [stepIndex])

  return (
    <Pager>
      <canvas
        p-10
        border-album
        onClick={() => clickHandler()}
        ref={ref}
      />
      <div
        font-mono w='[100%]' mt-3
        text='left gray-500'
      >
        step:
        {' '}
        {steps[stepIndex]}
      </div>
    </Pager>
  )
}
