import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page5Assets } from './assets'

export default function Page5({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-5'
  const [step, setStep] = useState(0)
  const finalStep = 4

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  const revealNext = () => {
    if (step >= finalStep) {
      goToPage?.('home-page-6')
      return
    }

    setStep((current) => Math.min(current + 1, finalStep))
  }

  return (
    <section
      id="home-page-5"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page5} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page5Assets.background}
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
            className="pointer-events-none absolute left-1/2 top-10 z-20 w-3/4 -translate-x-1/2"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <SceneImage asset={page5Assets.text} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute left-5 top-28 z-20 w-1/2"
            initial={{ opacity: 0, x: -22, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5 },
              x: { duration: 0.5, ease: 'easeOut' },
              y: { duration: 3.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page5Assets.characterOne} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 3 ? (
          <motion.div
            className="pointer-events-none absolute right-5 bottom-32 z-20 w-5/12"
            initial={{ opacity: 0, x: 22, y: 18 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5 },
              x: { duration: 0.5, ease: 'easeOut' },
              y: { duration: 3.5, delay: 0.9, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page5Assets.characterTwo} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 4 ? (
          <motion.div
            className="pointer-events-none absolute inset-x-6 bottom-24 z-20 rounded-[26px] bg-white/72 px-4 py-3 text-sm leading-6 text-slate-600 shadow-[0_10px_30px_rgba(142,159,197,0.16)] backdrop-blur-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            第五页保留双角色互动页的结构，但资源、编号和文件名都已经统一。
          </motion.div>
        ) : null}

        <ScrollHint />
      </div>
    </section>
  )
}
