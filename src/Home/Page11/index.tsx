import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page11Assets } from './assets'

export default function Page11({ activePageId }: HomePageProps) {
  const isActive = activePageId === 'home-page-11'
  const [step, setStep] = useState(0)
  const finalStep = 4

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  return (
    <section
      id="home-page-11"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page11} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page11Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        {step < finalStep ? (
          <button
            type="button"
            onClick={() => {
              setStep((current) => Math.min(current + 1, finalStep))
            }}
            className="absolute inset-0 z-10"
            aria-label="点击显示下一项内容"
          />
        ) : null}

        {step >= 1 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SceneImage asset={page11Assets.displayBoard} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SceneImage asset={page11Assets.text} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 3 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, x: -24 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.35 },
              x: { duration: 0.35 },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page11Assets.character} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 4 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <SceneImage asset={page11Assets.dialogBubble} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
