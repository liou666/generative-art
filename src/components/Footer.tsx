export default function Footer() {
  const [, toggle] = useDark()
  return (
    <nav
      flex-center gap-2
      text-xl m-6
    >
      <a
        i-carbon:logo-github
        icon-btn
        href='https://github.com/liou666'
        target='_blank'
        title='GitHub'
        rel='noreferrer'
      />
      <i
        icon-btn
        dark:i-carbon-moon i-carbon:sun
        onClick={() => toggle()}
      />
    </nav>
  )
}

