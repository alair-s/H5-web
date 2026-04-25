import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page10Assets } from './assets'

export default function Page10({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-10'
  const { playFinish } = useBackgroundMusic()
  const [step, setStep] = useState(0)
  const finalStep = 3

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

    const next = Math.min(step + 1, finalStep)
    // 信封飞入邮箱时播放完成音效
    if (next === 2) {
      playFinish()
    }
    setStep(next)
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
              className="pointer-events-none absolute bottom-0 z-20"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: step >= 2 ? 0 : 1, x: step >= 2 ? -12 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <SceneImage asset={page10Assets.characterOne} className=" w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute -bottom-60 z-20"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: step >= 1 ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page10Assets.dialogBubbleOne} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute -bottom-55 right-5 z-20"
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
              transition={{ duration: 0.35 ,delay: 1.2 }}
            >
              <SceneImage asset={page10Assets.characterTwo} className=" w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, scale: 0.96,x: 10 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 ,delay: 1.2 }}
            >
              <SceneImage asset={page10Assets.dialogBubbleTwo} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 1.2 }}
            >
              <SceneImage asset={page10Assets.textTwo} className="h-full w-full object-fill" />
            </motion.div>
          </>
        ) : null}

        {step >= 1 ? (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 100 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page10Assets.mailbox} className="h-full w-full object-fill" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute bottom-60  z-30"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.98 }}
              animate={{
                opacity: step >= 2 ? 0 : 1,
                x: step >= 2 ? 138 : 0,
                y: step >= 2 ? -102 : 0,
                scale: step >= 2 ? 0.76 : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <SceneImage asset={page10Assets.envelope} className="h-full w-full object-fill" />
            </motion.div>
          </>
        ) : null}

      

        <ScrollHint />
      </div>
    </section>
  )
}
