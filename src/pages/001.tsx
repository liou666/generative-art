import { suffix } from '@/utils'
import Pager from '@/components/Pager'

export default function TiledLine() {
  const ref = useRef<HTMLCanvasElement>(null)
  let ctx = useRef<CanvasRenderingContext2D>(null).current
  const pendingTask = useRef<Array<() => void>>([]).current
  let count = useRef(0).current

  const [size] = useState<number>(240)
  const [step] = useState<Array<number>>([20, 15, 10, 15, 20])
  const [stepIndex, setStepIndex] = useState<number>(0)

  const [refreshTime] = useState<number>(1)
  const [strokeColor] = useState<string>('rgb(107,114,128)')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function init() {
    const current = ref.current!
    ctx = current.getContext('2d')!
    const dpr = window.devicePixelRatio
    ctx.canvas.width = size * dpr
    ctx.canvas.height = size * dpr
    ctx.strokeStyle = strokeColor
    ctx.scale(dpr, dpr)
    start()
  }

  function frame() {
    if (pendingTask.length) {
      const fn = suffix(pendingTask).shift()!
      fn()
    }
  }

  function startFrame() {
    requestAnimationFrame(() => {
      count++
      if (count % refreshTime === 0)
        frame()
      if (pendingTask.length)
        startFrame()
    })
  }

  function clearCanvas() {
    const c = ctx!
    c.clearRect(0, 0, size, size)
  }

  function start() {
    clearCanvas()
    pendingTask.length = 0
    for (let x = 0; x < size; x += step[stepIndex]) {
      for (let y = 0; y < size; y += step[stepIndex])
        pendingTask.push(() => draw(x, y, step[stepIndex], step[stepIndex]))
    }
    startFrame()
  }

  function draw(x: number, y: number, width: number, height: number) {
    const c = ctx!
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
    start()
  }

  useEffect(() => {
    init()
  }, [init])

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

