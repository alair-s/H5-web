import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page7Assets } from './assets'

export default function Page7({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-7'
  const [step, setStep] = useState(0)
  const finalStep = 2

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  const revealNext = () => {
    if (step >= finalStep) {
      goToPage?.('home-page-8')
      return
    }

    setStep((current) => Math.min(current + 1, finalStep))
  }

  return (
    <section
      id="home-page-7"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page7} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page7Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.44),transparent_34%)]" />

        <button
          type="button"
          onClick={revealNext}
          className="absolute inset-0 z-10"
          aria-label={step >= finalStep ? '点击进入下一页' : '点击显示下一项内容'}
        />

        {step >= 1 ? (
          <motion.div
            className="pointer-events-none absolute bottom-20 z-20"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page7Assets.title} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page7Assets.character} className="w-full " />
          </motion.div>
        ) : null}


        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute inset-x-8 bottom-26 z-20  "
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.4  },
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page7Assets.button} className="block w-full" />
          </motion.div>
        ) : null}

        <ScrollHint />
      </div>
    </section>
  )
}
