interface InitCanvasProps {
  size?: number
  strokeColor?: string
  isScale?: boolean
}

function useInitCanvas({ size = 240, strokeColor = 'rgb(107,114,128)', isScale = true }: InitCanvasProps = {}) {
  const elRef = useRef<HTMLCanvasElement>(null)

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  function init() {
    if (elRef.current === null) return

    const current = elRef.current!
    ctxRef.current = current.getContext('2d')!
    const dpr = window.devicePixelRatio
    ctxRef.current.canvas.width = size * dpr
    ctxRef.current.canvas.height = size * dpr
    ctxRef.current.strokeStyle = strokeColor
    if (isScale) ctxRef.current.scale(dpr, dpr)
  }
  useMount(() => {
    init()
  })
  return [elRef, ctxRef] as const
}

export default useInitCanvas
