const IndexPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1
        text='4xl md:5xl lg:7xl'
        animate-bounce
      >
        Generative Artistry
      </h1>
      <div m-10 />
      <button
        border
        p='x-8 y-2'
        md='px-10 py-3'
        lg='px-16 py-4'
        hover='shadow-sm dark:shadow-orange'
        duration-300
        transition-all
        onClick={() => navigate('/001')}
      >
        Get Start
      </button>
    </div>
  )
}

export default IndexPage
