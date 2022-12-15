import Pager from '@/components/Pager'

export default function Spirograph() {
  const [ref, ctx] = useInitCanvas({ isScale: false })
  const [ratioIndex, setRatioIndex] = useState<number>(0)
  const s = useMonitor()

  const ratio = [50, 100, 500]

  function draw(radius1: number, radius2: number, ratio: number) {
    const c = ctx.current!
    const { width: size } = c.canvas
    const cx = size / 2
    const cy = size / 2
    let x, y, theta
    c.beginPath()
    for (theta = 0; theta <= Math.PI * 2; theta += 0.01) {
      x = cx + radius1 * Math.cos(theta) + radius2 * Math.cos(theta * ratio)
      y = cy + radius1 * Math.sin(theta) + radius2 * Math.sin(theta * ratio)
      c.lineTo(x, y)
    }
    c.stroke()
  }

  function start() {
    const c = ctx.current!
    const { width: size } = c.canvas
    c.clearRect(0, 0, size, size)
    draw(s.width < 610 ? 60 : 100, 50, ratio[ratioIndex])
  }

  function clickHandler() {
    if (ratioIndex === ratio.length - 1)
      setRatioIndex(0)
    else
      setRatioIndex(ratioIndex + 1)
  }

  useEffect(start, [ratioIndex])

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
        ratio:
        {' '}
        {ratio[ratioIndex]}
      </div>
    </Pager>
  )
}
