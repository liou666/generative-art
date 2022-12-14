interface InitCanvasProps {
  size?: number
  strokeColor?: string
  isScale?: boolean
}

function useInitCanvas({ size = 240, strokeColor = 'rgb(107,114,128)', isScale = true }: InitCanvasProps = {}) {
  const elRef = useRef<HTMLCanvasElement>(null)
  const s = useMonitor()
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  let SIZE = size
  if (s.width < 400)
    SIZE = 80
  else if (s.width < 620)
    SIZE = 142

  function init() {
    if (elRef.current === null) return

    const current = elRef.current!
    ctxRef.current = current.getContext('2d')!
    const dpr = window.devicePixelRatio

    ctxRef.current.canvas.width = SIZE * dpr
    ctxRef.current.canvas.height = SIZE * dpr
    ctxRef.current.strokeStyle = strokeColor
    if (isScale) ctxRef.current.scale(dpr, dpr)
  }
  useMount(init)
  return [elRef, ctxRef] as const
}

export default useInitCanvas
