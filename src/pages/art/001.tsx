import { suffix } from '@/utils'

export default function TiledLine() {
  const ref = useRef<HTMLCanvasElement>(null)
  let ctx = useRef<CanvasRenderingContext2D>(null).current
  const list = useRef<Array<Array<number>>>([]).current
  const pendingTask = useRef<Array<() => void>>([]).current
  let count = useRef(0).current

  const [size] = useState<number>(400)
  const [step] = useState<number>(15)
  const [refreshTime] = useState<number>(1)

  function init() {
    const current = ref.current!
    ctx = current.getContext('2d')!
    ctx.canvas.width = size
    ctx.canvas.height = size
    start()
  }

  function frame() {
    const fn = suffix(pendingTask).shift()!
    fn()
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
    list.length = 0
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step)
        pendingTask.push(() => draw(x, y, step, step))
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

  useMount(() => {
    init()
  })

  return (
    <div
      flex justify-center items-center
    >
      <canvas
        onClick={() => start()}
        ref={ref}
      />
    </div>
  )
}

