import type { FC, PropsWithChildren } from 'react'
import type { PageInfo } from '../works'
import works from '../works'

const Pager: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()
  const [current, setCurrent] = useState<PageInfo | undefined>(undefined)
  const [pre, setPre] = useState<PageInfo | undefined>(undefined)
  const [next, setNext] = useState<PageInfo | undefined>(undefined)

  useMount(() => {
    const currentIndex = +pathname.slice(1) - 1
    setPre(works[currentIndex - 1])
    setNext(works[currentIndex + 1])
    setCurrent(works[currentIndex])
  })

  return (
    <div
      flex-center
    >
      <div
        fixed
        bottom-3
        left-2
        transition-all
        duration-300
        font-mono
      >
        {pre && (
          <a
            text='gray-400 hover:gray-5 hover:dark:gray-3'
            duration-300
            font='thin'
            className='pre'
            href={`/${pre.no}`}
            cursor='pointer'
          >
            <span>{pre.name}</span>
            <span inline-block ml-2>{pre.no}</span>
          </a>
        )
        }
        {current && (
          <div cursor-pointer>
            <span font-bold>{current.name}</span>
            <span ml-2>{current.no}</span>
          </div>
        )
        }
        {next && (
          <a
            text='gray-400 hover:gray-5 hover:dark:gray-3'
            font='thin'
            duration-300
            className='next'
            href={`/${next.no}`}
            cursor='pointer'
          >
            <span>{next.name}</span>
            <span ml-2>{next.no}</span>
          </a>
        )
        }
      </div>
      {children}
    </div>
  )
}
export default Pager
