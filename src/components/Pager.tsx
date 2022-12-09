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
      flex='~ center col'
      select-none
    >
      <header
        text-gray-500
        absolute
        top-4
        left-4
      >
        <a
          href='/'
          text-2xl
          icon-btn
          i-carbon:harbor
        />
      </header>
      <div
        className='custom-link-nav group'
      >
        {pre && (
          <a
            className='pre-next-link'
            href={`/${pre.no}`}
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
            className='pre-next-link'
            href={`/${next.no}`}
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
