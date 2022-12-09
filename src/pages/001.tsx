import Pager from '@/components/Pager'

export default function TiledLine() {
  const [ref, ctx] = useInitCanvas()
  const { pendingTask, startFrame } = useFrame({ isSuffix: true })

  const step = [20, 15, 10, 15, 20]
  const [stepIndex, setStepIndex] = useState<number>(0)

  function start() {
    const c = ctx.current!
    const { width: size } = c.canvas
    c.clearRect(0, 0, size, size)

    pendingTask.length = 0
    for (let x = 0; x < size; x += step[stepIndex]) {
      for (let y = 0; y < size; y += step[stepIndex])
        pendingTask.push(() => draw(x, y, step[stepIndex], step[stepIndex]))
    }
    startFrame()
  }

  function draw(x: number, y: number, width: number, height: number) {
    const c = ctx.current!
    const leftToRight = Math.random() >= 0.5

    c.beginPath()
    if (leftToRight) {
      c.moveTo(x, y)
      c.lineTo(x + width, y + height)
    }
    else {
      c.moveTo(x + width, y)
      c.lineTo(x, y + height)
    }
    c.stroke()
  }

  function clickHandler() {
    if (stepIndex === step.length - 1)
      setStepIndex(0)
    else
      setStepIndex(stepIndex + 1)
  }

  useEffect(start, [stepIndex])

  return (
    <Pager>
      <canvas
        border-album
        p-10
        onClick={() => clickHandler()}
        ref={ref}
      />
      <div
        font-mono w='[100%]' mt-3
        text='left gray-500'
      >
        step:
        {' '}
        {step[stepIndex]}
      </div>

    </Pager>
  )
}

