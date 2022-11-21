import { suffix } from '@/utils'

interface IProps {
  refreshTime?: number
  isSuffix?: boolean
}
const useFrame = ({ refreshTime = 1, isSuffix = false }: IProps = {}) => {
  const pendingTask = useRef<Array<() => void>>([]).current
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
      if (count % refreshTime === 0) frame()
      if (pendingTask.length) startFrame()
    })
  }
  return { pendingTask, startFrame }
}

export default useFrame
