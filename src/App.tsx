import { BackgroundMusicProvider } from './Component/BackgroundMusicProvider'
import Home from './Home'

export default function App() {
  return (
    <BackgroundMusicProvider>
      <Home />
    </BackgroundMusicProvider>
  )
}
