import works from '../works'

const IndexPage = () => {
  return (
    <div
      font-mono
      p-6
    >
      <h1
        text='3xl md:4xl lg:5xl left'
        animate-bounce
      >
        Generative Artistry
      </h1>
      <div m-10 />
      <section
        text='left lg'
        grid='cols-1 ~ sm:cols-3  gap-2 items-start '
        place-content-start
        max-h-360px
        overflow-auto
      >
        {
          works.map((w) => {
            return (
              <a
                text='gray-4 dark:gray-500 hover:gray-500 hover:dark:gray-4'
                href={`/${w.no}`} cursor-pointer
                key={w.no}
              >
                {`${w.no} ${w.name} `}
              </a>
            )
          })
        }
      </section>
    </div>
  )
}

export default IndexPage
