import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page2Assets } from './assets'

const photoCards = [
  {
    key: 'photoOne',
    asset: page2Assets.photoOne,
    className: 'left-1/2 top-[16%] w-[78%] -translate-x-1/2',
    initial: { opacity: 0, x: -90, y: 30, rotate: -12, scale: 0.86 },
    animate: { opacity: 1, x: 0, y: 0, rotate: -3, scale: 1.3 },
  },
  {
    key: 'photoTwo',
    asset: page2Assets.photoTwo,
    className: 'left-1/2 top-[17.5%] w-[78%] -translate-x-1/2',
    initial: { opacity: 0, x: 90, y: 26, rotate: 12, scale: 0.86 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 1, scale: 1.3 },
  },
  {
    key: 'photoThree',
    asset: page2Assets.photoThree,
    className: 'left-1/2 top-[19%] w-[78%] -translate-x-1/2',
    initial: { opacity: 0, x: 0, y: 70, rotate: -8, scale: 0.86 },
    animate: { opacity: 1, x: 0, y: 0, rotate: -1, scale: 1.3 },
  },
] as const

export default function Page2({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-2'
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  const revealNextPhoto = () => {
    if (step >= photoCards.length + 1) {
      goToPage?.('home-page-3')
      return
    }

    setStep((current) => current + 1)
  }

  return (
    <section
      id="home-page-2"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page2} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page2Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />



        <button
          type="button"
          onClick={revealNextPhoto}
          className="absolute inset-x-[4%] top-5 bottom-16 z-10"
          aria-label="点击展开照片"
        >
          {photoCards.map((item, index) => {
            if (index >= step) {
              return null
            }

            return (
              <motion.div
                key={item.key}
                className={`absolute ${item.className}`}
                initial={item.initial}
                animate={item.animate}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ zIndex: index + 1 }}
              >
                <SceneImage
                  asset={item.asset}
                  className="pointer-events-none block w-full drop-shadow-[0_18px_32px_rgba(94,108,153,0.24)]"
                />
              </motion.div>
            )
          })}
        </button>

        <motion.div
          className="pointer-events-none absolute inset-x-[10%] bottom-35 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: step >= photoCards.length + 1 ? 1 : 0,
            y: step >= photoCards.length + 1 ? 0 : 20,
            scale: 1.3,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <SceneImage asset={page2Assets.text} className="block w-full" />
        </motion.div>

        <ScrollHint />
      </div>
    </section>
  )
}
