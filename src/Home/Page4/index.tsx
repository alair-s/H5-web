import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page4Assets } from './assets'

export default function Page4({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-4'
  const { playFinish } = useBackgroundMusic()
  const [step, setStep] = useState(1)
  const finalStep = 3
  const [scratchPhase, setScratchPhase] = useState<'idle' | 'scratching' | 'revealed'>('idle')
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const scratchCardRef = useRef<HTMLDivElement | null>(null)
  const scratchImageRef = useRef<HTMLImageElement | null>(null)
  const isScratchingRef = useRef(false)
  const scratchDoneRef = useRef(false)

  const setupScratchLayer = () => {
    const canvas = scratchCanvasRef.current
    const card = scratchCardRef.current
    const image = scratchImageRef.current

    if (!canvas || !card || !image) {
      return
    }

    const cardRect = card.getBoundingClientRect()
    const imageRect = image.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const width = Math.floor(cardRect.width)
    const height = Math.floor(imageRect.height)

    if (!width || !height) {
      return
    }

    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'rgba(34, 43, 63, 0.88)'
    context.fillRect(0, 0, width, height)
  }

  useEffect(() => {
    if (!isActive) {
      setStep(0)
      setScratchPhase('idle')
      scratchDoneRef.current = false
    }
  }, [isActive])

  useEffect(() => {
    if (step !== 2) {
      return
    }

    scratchDoneRef.current = false
    setScratchPhase('idle')

    const frameId = window.requestAnimationFrame(setupScratchLayer)
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            setupScratchLayer()
          })

    if (scratchCardRef.current) {
      resizeObserver?.observe(scratchCardRef.current)
    }

    if (scratchImageRef.current) {
      resizeObserver?.observe(scratchImageRef.current)
    }

    window.addEventListener('resize', setupScratchLayer)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', setupScratchLayer)
    }
  }, [step])

  const revealNext = () => {
    if (step >= finalStep) {
      goToPage?.('home-page-5-pre')
      return
    }

    setStep((current) => Math.min(current + 1, finalStep))
  }

  const scratchAtPoint = (clientX: number, clientY: number) => {
    const canvas = scratchCanvasRef.current

    if (!canvas) {
      return
    }

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    context.save()
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(x, y, 28, 0, Math.PI * 2)
    context.fill()
    context.restore()
  }

  const finishScratch = () => {
    const canvas = scratchCanvasRef.current

    if (!canvas || scratchDoneRef.current) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    const { data } = context.getImageData(0, 0, canvas.width, canvas.height)
    let transparentPixels = 0

    for (let index = 3; index < data.length; index += 4) {
      if (data[index] < 16) {
        transparentPixels += 1
      }
    }

    const revealRatio = transparentPixels / (canvas.width * canvas.height)

    if (revealRatio >= 0.5) {
      scratchDoneRef.current = true
      setScratchPhase('revealed')
      setStep(3)
      playFinish()
    }
  }

  return (
    <section
      id="home-page-4"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page4} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page4Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        {step !== 2 ? (
          <button
            type="button"
            onClick={revealNext}
            className="absolute inset-0 z-10"
            aria-label={step >= finalStep ? '点击进入下一页' : '点击显示下一项内容'}
          />
        ) : null}

        {step >= 3 ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 bottom-40 z-20 w-3/4 -translate-x-1/2"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0, scale: 1.3 }}
            transition={{ duration: 0.45 }}
          >
            <SceneImage asset={page4Assets.text} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <div
            ref={scratchCardRef}
            className={`absolute inset-x-5 top-40 z-20 overflow-hidden  border border-white/70 bg-white/44 shadow-[0_12px_34px_rgba(141,157,191,0.18)] backdrop-blur-sm ${step >= 3 ? 'pointer-events-none' : ''}`}
          >
            <SceneImage
              asset={page4Assets.afterErase}
              className="block w-full"
              ref={scratchImageRef}
              onLoad={() => {
                if (step === 2) {
                  setupScratchLayer()
                }
              }}
            />
            {scratchPhase === 'idle' ? (
              <motion.div
                className="pointer-events-none absolute inset-x-8 top-1/2 z-30 -translate-y-1/2 text-center text-base font-medium leading-7 text-white"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.03, 1],
                  textShadow: [
                    '0 0 10px rgba(255,255,255,0.22)',
                    '0 0 22px rgba(255,255,255,0.55)',
                    '0 0 10px rgba(255,255,255,0.22)',
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                用手拂去灰尘，
                唤醒古老砖纹路
              </motion.div>
            ) : null}
            <canvas
              ref={scratchCanvasRef}
              className={`absolute inset-0 h-full w-full touch-none ${scratchPhase === 'revealed' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
              onPointerDown={(event) => {
                isScratchingRef.current = true
                if (scratchPhase === 'idle') {
                  setScratchPhase('scratching')
                }
                event.currentTarget.setPointerCapture(event.pointerId)
                scratchAtPoint(event.clientX, event.clientY)
              }}
              onPointerMove={(event) => {
                if (!isScratchingRef.current) {
                  return
                }

                scratchAtPoint(event.clientX, event.clientY)
              }}
              onPointerUp={(event) => {
                isScratchingRef.current = false
                event.currentTarget.releasePointerCapture(event.pointerId)
                finishScratch()
              }}
              onPointerLeave={() => {
                if (!isScratchingRef.current) {
                  return
                }

                isScratchingRef.current = false
                finishScratch()
              }}
            />
            {scratchPhase === 'revealed' ? (
              <>
                <motion.div
                  className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),rgba(255,255,255,0)_58%)]"
                  initial={{ opacity: 0.1, scale: 0.92 }}
                  animate={{ opacity: [0.15, 0.48, 0], scale: [0.92, 1.08, 1.18] }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-[-24%] z-30 w-1/3 rotate-[12deg] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.78),rgba(255,255,255,0))] blur-md"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: '420%', opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                <motion.span
                  className="pointer-events-none absolute left-8 top-8 z-30 text-xl text-white"
                  initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.8], rotate: [-12, 0, 12] }}
                  transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="pointer-events-none absolute right-10 top-14 z-30 text-2xl text-white"
                  initial={{ opacity: 0, scale: 0.5, rotate: 8 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 0.75], rotate: [8, 0, -8] }}
                  transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="pointer-events-none absolute bottom-10 left-1/2 z-30 text-xl text-white"
                  initial={{ opacity: 0, scale: 0.5, x: '-50%' }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.18, 0.8], x: '-50%' }}
                  transition={{ duration: 1, delay: 0.28, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
              </>
            ) : null}
          </div>
        ) : null}


        <ScrollHint />
      </div>
    </section>
  )
}
