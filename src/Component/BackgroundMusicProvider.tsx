import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { motion } from 'motion/react'
import type { MusicTrack } from '../Background/music'

type BackgroundMusicContextValue = {
  currentTrack: MusicTrack | null
  isReady: boolean
  isPlaying: boolean
  setTrack: (track: MusicTrack | null) => void
  enablePlayback: () => Promise<void>
  togglePlayback: () => Promise<void>
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(
  null,
)

async function safePlay(audio: HTMLAudioElement) {
  try {
    await audio.play()
  } catch {
    return
  }
}

export function BackgroundMusicProvider({ children }: PropsWithChildren) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'none'
    audioRef.current = audio

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.pause()
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (!currentTrack?.src) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      setIsPlaying(false)
      return
    }

    audio.src = currentTrack.src
    audio.load()

    if (isReady) {
      void safePlay(audio)
    }
  }, [currentTrack, isReady])

  const enablePlayback = async () => {
    setIsReady(true)

    const audio = audioRef.current

    if (!audio || !currentTrack?.src) {
      return
    }

    await safePlay(audio)
  }

  const togglePlayback = async () => {
    const audio = audioRef.current

    if (!audio || !currentTrack?.src) {
      setIsReady((prev) => !prev)
      return
    }

    if (!isReady || audio.paused) {
      setIsReady(true)
      await safePlay(audio)
      return
    }

    audio.pause()
    setIsReady(false)
  }

  const value = useMemo(
    () => ({
      currentTrack,
      isReady,
      isPlaying,
      setTrack: setCurrentTrack,
      enablePlayback,
      togglePlayback,
    }),
    [currentTrack, isPlaying, isReady],
  )

  return (
    <BackgroundMusicContext.Provider value={value}>
      {children}
      <MusicToggle />
    </BackgroundMusicContext.Provider>
  )
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext)

  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider')
  }

  return context
}

function MusicToggle() {
  const { currentTrack, isReady, isPlaying, togglePlayback } = useBackgroundMusic()

  return (
    <motion.button
      type="button"
      onClick={() => void togglePlayback()}
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-4 py-2 text-xs text-slate-700 shadow-[0_10px_28px_rgba(116,132,180,0.2)] backdrop-blur-md"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isPlaying ? 'bg-emerald-400' : 'bg-slate-400'
        }`}
      />
      <span>{isReady ? 'Music On' : 'Music Off'}</span>
      <span className="max-w-24 truncate text-slate-500">
        {currentTrack?.title ?? 'No Track'}
      </span>
    </motion.button>
  )
}
