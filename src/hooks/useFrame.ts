import { suffix } from '@/utils'

interface IProps {
  refreshTime?: number
  isSuffix?: boolean
}
const useFrame = ({ refreshTime = 1, isSuffix = false }: IProps = {}) => {
  const pendingTask = useRef<Array<() => void>>([]).current
  const [run, setRun] = useState<boolean>(true)

  let count = useRef(0).current
  function frame() {
    if (pendingTask.length) {
      const fn = isSuffix ? suffix(pendingTask).shift()! : pendingTask.shift()!
      fn()
    }
  }

  function startFrame() {
    requestAnimationFrame(() => {
      count++
      setRun(() => true)
      if (count % refreshTime === 0) frame()
      if (pendingTask.length && run) startFrame()
    })
  }
  function stopFrame() {
    pendingTask.length = 0
    setRun(() => false)
  }
  return { pendingTask, startFrame, stopFrame }
}

export default useFrame
