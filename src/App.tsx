import { useCallback, useState } from 'react'
import { BackgroundMusicProvider } from './Component/BackgroundMusicProvider'
import Loading from './Component/Loading'
import Home from './Home'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoaded = useCallback(() => setLoaded(true), [])

  if (!loaded) {
    return <Loading onLoaded={handleLoaded} />
  }

  return (
    <BackgroundMusicProvider>
      <Home />
    </BackgroundMusicProvider>
  )
}
