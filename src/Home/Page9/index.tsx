import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page9Assets } from './assets'

export default function Page9({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-9'
  const [step, setStep] = useState(0)
  const finalStep = 4

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  const revealNext = () => {
    if (step >= finalStep) {
      goToPage?.('home-page-10')
      return
    }

    setStep((current) => Math.min(current + 1, finalStep))
  }

  return (
    <section
      id="home-page-9"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page9} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page9Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        <button
          type="button"
          onClick={revealNext}
          className="absolute inset-0 z-10"
          aria-label={step >= finalStep ? '点击进入下一页' : '点击显示下一项内容'}
        />

        {step >= 1 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <SceneImage asset={page9Assets.girl} className="w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <SceneImage asset={page9Assets.dialogBubble} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 3 ? (
          <motion.div
            className="pointer-events-none absolute right-[16%] top-[29%] z-30 w-[22%]"
            initial={{ opacity: 0, y: -28, rotate: 18 }}
            animate={{
              opacity: 1,
              y: step >= 4 ? 92 : [0, -6, 0],
              x: step >= 4 ? -72 : 0,
              rotate: step >= 4 ? -18 : [12, 8, 12],
            }}
            transition={{
              opacity: { duration: 0.3 },
              x: { duration: 0.5, ease: 'easeInOut' },
              y: { duration: step >= 4 ? 0.5 : 2.4, repeat: step >= 4 ? 0 : Infinity, ease: 'easeInOut' },
              rotate: { duration: step >= 4 ? 0.5 : 2.4, repeat: step >= 4 ? 0 : Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page9Assets.stamp} className="block w-full drop-shadow-[0_14px_24px_rgba(98,71,53,0.2)]" />
          </motion.div>
        ) : null}

        {step >= 4 ? (
          <motion.div
            className="pointer-events-none absolute left-[34%] top-[31%] z-20 w-[30%] mix-blend-multiply"
            initial={{ opacity: 0, scale: 1.2, rotate: -10 }}
            animate={{ opacity: 0.9, scale: 1, rotate: -12 }}
            transition={{ duration: 0.35 }}
          >
            <SceneImage asset={page9Assets.postmark} className="block w-full opacity-80" />
          </motion.div>
        ) : null}

        <ScrollHint />
      </div>
    </section>
  )
}
