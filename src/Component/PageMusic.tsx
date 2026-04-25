import { useEffect } from 'react'
import { bgTrack, type MusicTrack } from '../Background/music'
import { useBackgroundMusic } from './BackgroundMusicProvider'

type PageMusicProps = {
  isActive: boolean
  track?: MusicTrack
}

export default function PageMusic({ isActive }: PageMusicProps) {
  const { currentTrack, setTrack } = useBackgroundMusic()

  useEffect(() => {
    if (!isActive || currentTrack?.id === bgTrack.id) {
      return
    }

    setTrack(bgTrack)
  }, [currentTrack?.id, isActive, setTrack])

  return null
}
