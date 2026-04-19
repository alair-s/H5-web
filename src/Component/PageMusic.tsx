import { useEffect } from 'react'
import type { MusicTrack } from '../Background/music'
import { useBackgroundMusic } from './BackgroundMusicProvider'

type PageMusicProps = {
  isActive: boolean
  track: MusicTrack
}

export default function PageMusic({ isActive, track }: PageMusicProps) {
  const { currentTrack, setTrack } = useBackgroundMusic()

  useEffect(() => {
    if (!isActive || currentTrack?.id === track.id) {
      return
    }

    setTrack(track)
  }, [currentTrack?.id, isActive, setTrack, track])

  return null
}
