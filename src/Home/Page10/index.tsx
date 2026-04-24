import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page10Assets } from './assets'

export default function Page10({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-10'
  const [step, setStep] = useState(0)
  const finalStep = 4

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  const revealNext = () => {
    if (step >= finalStep) {
      goToPage?.('home-page-11')
      return
    }

    setStep((current) => Math.min(current + 1, finalStep))
  }

  return (
    <section
      id="home-page-10"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page10} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page10Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        <button
          type="button"
          onClick={revealNext}
          className="absolute inset-0 z-10"
          aria-label={step >= finalStep ? '点击进入下一页' : '点击显示下一项内容'}
        />

        {step >= 1 ? (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: step >= 2 ? 0 : 1, x: step >= 2 ? -12 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <SceneImage asset={page10Assets.characterOne} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: step >= 1 ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page10Assets.dialogBubbleOne} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: step >= 1 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <SceneImage asset={page10Assets.textOne} className="h-full w-full object-fill" />
            </motion.div>
          </>
        ) : null}

        {step >= 2 ? (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page10Assets.characterTwo} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page10Assets.dialogBubbleTwo} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <SceneImage asset={page10Assets.textTwo} className="h-full w-full object-fill" />
            </motion.div>
          </>
        ) : null}

        {step >= 3 ? (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page10Assets.mailbox} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.98 }}
              animate={{
                opacity: step >= 4 ? 0 : 1,
                x: step >= 4 ? 138 : 0,
                y: step >= 4 ? -102 : 0,
                scale: step >= 4 ? 0.76 : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <SceneImage asset={page10Assets.envelope} className="h-full w-full object-fill" />
            </motion.div>
          </>
        ) : null}

        {step >= 4 ? (
          <motion.div
            className="pointer-events-none absolute right-[17%] top-[49%] z-30 rounded-full bg-[#ffefe3] px-4 py-2 text-sm tracking-[0.18em] text-[#c96e46] shadow-[0_14px_28px_rgba(214,133,88,0.2)]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            已投入邮筒
          </motion.div>
        ) : null}

        <ScrollHint />
      </div>
    </section>
  )
}
