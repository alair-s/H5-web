import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page3Assets } from './assets'

const placeCards = [
  {
    key: 'zhongshanRoad',
    asset: page3Assets.zhongshanRoad,
    className: 'absolute left-20 top-40 w-3/5 rotate-[-2deg]',
  },
  {
    key: 'alley',
    asset: page3Assets.alley,
    className: 'absolute right-20 top-48 w-3/5 rotate-[1deg]',
  },
  {
    key: 'twinTowers',
    asset: page3Assets.twinTowers,
    className: 'absolute left-20 bottom-60 w-3/5 rotate-[-1deg]',
  },
  {
    key: 'bungalow',
    asset: page3Assets.bungalow,
    className: 'absolute right-20 bottom-60 w-3/5 rotate-[5deg]',
  },
] as const

export default function Page3({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-3'
  const [step, setStep] = useState(0)
  const finalStep = placeCards.length + 3

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  const revealNext = () => {
    if (step >= finalStep) {
      goToPage?.('home-page-4')
      return
    }

    setStep((current) => Math.min(current + 1, finalStep))
  }

  return (
    <section
      id="home-page-3"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page3} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page3Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.18))]" />

        <button
          type="button"
          onClick={revealNext}
          className="absolute inset-0 z-10"
          aria-label={step >= finalStep ? '点击进入下一页' : '点击显示下一项内容'}
        />

        {step >= 5 ? (
          <motion.div
            className="pointer-events-none absolute left-5 bottom-6 z-30 w-2/5"
            initial={{ opacity: 1, x: -24, y: 0, scale: 1.5}}
            animate={{ opacity: 1, x: -15, y: 0, scale: 1.5}}
            transition={{ duration: 1 }}
          >
            <SceneImage asset={page3Assets.ip} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 6 ? (
          <motion.div
            className="pointer-events-none absolute right-20 bottom-30 z-30 w-1/3"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 3 }}
            transition={{ duration: 0.4 }}
          >
            <SceneImage asset={page3Assets.bubble} className="block w-full" />
          </motion.div>
        ) : null}

        {placeCards.map((item, index) =>
          step >= index +1 ? (
            <motion.div
              key={item.key}
              className={`pointer-events-none ${item.className} z-20`}
              initial={{ opacity: 0, y: 22, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1.8 }}
              transition={{ duration: 0.45 }}
            >
              <SceneImage asset={item.asset} className="block w-full" />
            </motion.div>
          ) : null,
        )}

  

        <ScrollHint />
      </div>
    </section>
  )
}
