import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { motion } from 'motion/react'
import { coreAudioSrcs } from '../Background/audioAssets'
import { resolvePreloadedAudioSrc } from '../Background/audioPreload'
import type { MusicTrack } from '../Background/music'

type BackgroundMusicContextValue = {
  currentTrack: MusicTrack | null
  isReady: boolean
  isPlaying: boolean
  setTrack: (track: MusicTrack | null) => void
  enablePlayback: () => Promise<void>
  togglePlayback: () => Promise<void>
  playClick: () => void
  playFinish: () => void
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
  const clickAudioRef = useRef<HTMLAudioElement | null>(null)
  const finishAudioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  // 默认开启，首次用户交互后浏览器会解锁自动播放
  const [isReady, setIsReady] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio

    const click = new Audio(resolvePreloadedAudioSrc(coreAudioSrcs.click))
    click.preload = 'auto'
    click.load()
    clickAudioRef.current = click

    const finish = new Audio(resolvePreloadedAudioSrc(coreAudioSrcs.finish))
    finish.preload = 'auto'
    finish.load()
    finishAudioRef.current = finish

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.pause()
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audioRef.current = null
      clickAudioRef.current = null
      finishAudioRef.current = null
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

    audio.src = resolvePreloadedAudioSrc(currentTrack.src)
    audio.load()

    if (isReady) {
      void safePlay(audio)
    }
  }, [currentTrack, isReady])

  const playClick = useCallback(() => {
    const audio = clickAudioRef.current
    if (!audio || !isReady) return
    audio.currentTime = 0
    void audio.play().catch(() => {})
  }, [isReady])

  const playFinish = useCallback(() => {
    const audio = finishAudioRef.current
    if (!audio || !isReady) return
    audio.currentTime = 0
    void audio.play().catch(() => {})
  }, [isReady])

  // 全局点击：播放点击音效 + 首次交互时解锁背景音乐
  useEffect(() => {
    if (!isReady) return

    const handleGlobalClick = () => {
      // 背景音乐被浏览器阻断后，首次点击恢复播放
      const bgAudio = audioRef.current
      if (bgAudio && bgAudio.paused && bgAudio.src) {
        void bgAudio.play().catch(() => {})
      }

      // 点击音效
      const clickAudio = clickAudioRef.current
      if (!clickAudio) return
      clickAudio.currentTime = 0
      void clickAudio.play().catch(() => {})
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [isReady])

  const enablePlayback = async () => {
    setIsReady(true)
    const audio = audioRef.current
    if (!audio || !currentTrack?.src) return
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
      playClick,
      playFinish,
    }),
    [currentTrack, isPlaying, isReady, playClick, playFinish],
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
  const { isReady, isPlaying, togglePlayback } = useBackgroundMusic()

  return (
    <motion.button
      type="button"
      onClick={() => void togglePlayback()}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-[0_8px_24px_rgba(116,132,180,0.22)] backdrop-blur-md active:scale-90 transition-transform"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-label={isReady ? '关闭音乐' : '开启音乐'}
    >
      {isReady && isPlaying ? (
        // 音乐播放中：喇叭+声波图标
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5a6fa8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        // 静音：喇叭+X图标
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </motion.button>
  )
}
