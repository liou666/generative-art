import { Suspense } from 'react'
import Footer from '@/components/Footer'
import routes from '~react-pages'

export default function App() {
  return (
    <main
      font-sans p='x-4 y-10'
      h-100vh
      flex='~ col'
      text='center gray-700 dark:gray-200'
    >
      <div flex='1 center'>
        <Suspense fallback={<div>Loading...</div>}>
          {useRoutes(routes)}
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
