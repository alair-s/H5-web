import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page5Assets } from './assets'

/** 固定参数，避免每次渲染随机导致闪烁或 SSR 不一致 */
const PETAL_LAYERS = [
  { id: 0, left: '6%', delay: 0, duration: 5.4, w: 11, h: 15, hue: 'from-pink-200/90 to-rose-200/70', drift: -18, spin: 340 },
  { id: 1, left: '18%', delay: 0.35, duration: 4.9, w: 9, h: 12, hue: 'from-fuchsia-100/85 to-pink-200/75', drift: 12, spin: -280 },
  { id: 2, left: '28%', delay: 0.7, duration: 5.8, w: 10, h: 14, hue: 'from-pink-100/80 to-rose-100/65', drift: -10, spin: 260 },
  { id: 3, left: '42%', delay: 0.2, duration: 5.1, w: 8, h: 11, hue: 'from-rose-200/88 to-pink-300/72', drift: 16, spin: -310 },
  { id: 4, left: '54%', delay: 0.55, duration: 6.2, w: 12, h: 16, hue: 'from-pink-200/85 to-fuchsia-200/68', drift: -14, spin: 300 },
  { id: 5, left: '68%', delay: 0.9, duration: 4.7, w: 9, h: 13, hue: 'from-pink-100/90 to-rose-200/78', drift: 8, spin: -240 },
  { id: 6, left: '78%', delay: 0.15, duration: 5.5, w: 10, h: 14, hue: 'from-rose-100/82 to-pink-200/74', drift: -20, spin: 380 },
  { id: 7, left: '88%', delay: 0.45, duration: 5.0, w: 8, h: 12, hue: 'from-fuchsia-100/78 to-pink-200/80', drift: 14, spin: -290 },
  { id: 8, left: '12%', delay: 1.1, duration: 5.6, w: 9, h: 13, hue: 'from-pink-200/75 to-rose-100/70', drift: 10, spin: 220 },
  { id: 9, left: '36%', delay: 0.85, duration: 4.6, w: 11, h: 15, hue: 'from-pink-100/88 to-fuchsia-100/72', drift: -16, spin: -350 },
  { id: 10, left: '62%', delay: 1.25, duration: 5.9, w: 8, h: 11, hue: 'from-rose-200/80 to-pink-200/76', drift: 18, spin: 270 },
  { id: 11, left: '94%', delay: 0.6, duration: 5.3, w: 10, h: 14, hue: 'from-pink-200/82 to-rose-200/74', drift: -12, spin: -300 },
  { id: 12, left: '10%', delay: 1.5, duration: 5.1, w: 11, h: 15, hue: 'from-pink-200/88 to-fuchsia-100/72', drift: 16, spin: 340 },
  { id: 13, left: '22%', delay: 1.85, duration: 4.9, w: 9, h: 12, hue: 'from-fuchsia-100/85 to-pink-200/75', drift: -12, spin: -280 },
  { id: 14, left: '32%', delay: 2.2, duration: 5.8, w: 10, h: 14, hue: 'from-pink-100/80 to-rose-100/65', drift: 10, spin: 260 },
  { id: 15, left: '46%', delay: 1.7, duration: 5.1, w: 8, h: 11, hue: 'from-rose-200/88 to-pink-300/72', drift: -16, spin: -310 },
  { id: 16, left: '58%', delay: 2.05, duration: 6.2, w: 12, h: 16, hue: 'from-pink-200/85 to-fuchsia-200/68', drift: 14, spin: 300 },
  { id: 17, left: '72%', delay: 2.4, duration: 4.7, w: 9, h: 13, hue: 'from-pink-100/90 to-rose-200/78', drift: -8, spin: -240 },
  { id: 18, left: '82%', delay: 1.95, duration: 5.5, w: 10, h: 14, hue: 'from-rose-100/82 to-pink-200/74', drift: 20, spin: 380 },
  { id: 19, left: '92%', delay: 2.3, duration: 5.0, w: 8, h: 12, hue: 'from-fuchsia-100/78 to-pink-200/80', drift: -14, spin: -290 },
  { id: 20, left: '10%', delay: 2.65, duration: 5.6, w: 9, h: 13, hue: 'from-pink-200/75 to-rose-100/70', drift: 10, spin: 220 },
  { id: 21, left: '34%', delay: 2.9, duration: 4.6, w: 11, h: 15, hue: 'from-pink-100/88 to-fuchsia-100/72', drift: -16, spin: -350 },
  { id: 22, left: '56%', delay: 3.25, duration: 5.9, w: 8, h: 11, hue: 'from-rose-200/80 to-pink-200/76', drift: 18, spin: 270 },
  { id: 23, left: '78%', delay: 2.7, duration: 5.3, w: 10, h: 14, hue: 'from-pink-200/82 to-rose-200/74', drift: -12, spin: -300 },
  { id: 24, left: '100%', delay: 3.05, duration: 5.1, w: 11, h: 15, hue: 'from-pink-200/88 to-fuchsia-100/72', drift: 16, spin: 340 },
  { id: 25, left: '12%', delay: 3.4, duration: 4.9, w: 9, h: 12, hue: 'from-fuchsia-100/85 to-pink-200/75', drift: -12, spin: -280 },
  { id: 26, left: '36%', delay: 3.75, duration: 5.8, w: 10, h: 14, hue: 'from-pink-100/80 to-rose-100/65', drift: 10, spin: 260 },
  { id: 27, left: '50%', delay: 4.1, duration: 5.1, w: 8, h: 11, hue: 'from-rose-200/88 to-pink-300/72', drift: -16, spin: -310 },
  { id: 28, left: '62%', delay: 4.45, duration: 6.2, w: 12, h: 16, hue: 'from-pink-200/85 to-fuchsia-200/68', drift: 14, spin: 300 },
  { id: 29, left: '76%', delay: 4.8, duration: 4.7, w: 9, h: 13, hue: 'from-pink-100/90 to-rose-200/78', drift: -8, spin: -240 },
  { id: 30, left: '86%', delay: 4.25, duration: 5.5, w: 10, h: 14, hue: 'from-rose-100/82 to-pink-200/74', drift: 20, spin: 380 },
  { id: 31, left: '96%', delay: 4.6, duration: 5.0, w: 8, h: 12, hue: 'from-fuchsia-100/78 to-pink-200/80', drift: -14, spin: -290 },
  { id: 32, left: '10%', delay: 4.95, duration: 5.6, w: 9, h: 13, hue: 'from-pink-200/75 to-rose-100/70', drift: 10, spin: 220 },
] as const

export default function Page5({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-5'
  const [step, setStep] = useState(0)
  /** step 0 仅背景；1 角色；2 文案+花瓣；再点击进入第六页 */
  const finalStep = 3

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
          <div className="pointer-events-none absolute bottom-20 left-1/2 z-1 w-[78%] max-w-[300px] -translate-x-1/2">
            <div className="relative w-full">
              <motion.div
                className="relative w-full"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{
                  opacity: step >= 2 ? 0 : 1,
                  y: step >= 2 ? 20 : 0,
                  scale: step >= 2 ? 1.08 : 1.3,
                }}
                transition={{
                  opacity: { duration: 0.42, ease: 'easeIn' },
                  y: { duration: 0.48, ease: 'easeInOut' },
                  scale: { duration: 0.48, ease: 'easeInOut' },
                }}
              >
                <SceneImage asset={page5Assets.characterOne} className="block w-full" />
              </motion.div>
              <motion.div
                className="absolute inset-x-0 top-0 w-full"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: step >= 2 ? 1 : 0,
                  y: step >= 2 ? 0 : 16,
                  scale: step >= 2 ? 1.4 : 0.92,
                }}
                transition={{
                  opacity: { duration: 0.48, ease: 'easeOut', delay: step >= 2 ? 0.14 : 0 },
                  y: { duration: 0.52, ease: 'easeOut', delay: step >= 2 ? 0.1 : 0 },
                  scale: { duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: step >= 2 ? 0.1 : 0 },
                }}
              >
                <SceneImage asset={page5Assets.characterTwo} className="block w-full" />
              </motion.div>
            </div>
          </div>
        ) : null}

        {step >= 0 ? (
          <>
            <div className="pointer-events-none absolute inset-0 z-20 h-full w-full min-h-0 overflow-hidden">
              {PETAL_LAYERS.map((p) => (
                <motion.div
                  key={p.id}
                  className={`absolute bg-linear-to-br ${p.hue} shadow-sm`}
                  style={{
                    left: p.left,
                    width: p.w,
                    height: p.h,
                    marginLeft: `${-p.w / 2}px`,
                    borderRadius: '55% 45% 60% 40% / 50% 55% 45% 50%',
                  }}
                  initial={{ top: '-12%', x: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    top: '112%',
                    x: [0, p.drift * 0.4, p.drift, p.drift * 0.6, 0],
                    opacity: [0, 0.95, 0.9, 0.85, 0.75],
                    rotate: [0, p.spin * 0.35, p.spin * 0.7, p.spin],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.15, 0.45, 0.78, 1],
                  }}
                />
              ))}
            </div>
          </>
        ) : null}

        {step >= 3 ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 bottom-40 z-10 w-3/4 -translate-x-1/2"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0, scale: 1.5 }}
            transition={{ duration: 0.45 }}
          >
            <SceneImage asset={page5Assets.text} className="block w-full" />
          </motion.div>
        ) : null}
        <ScrollHint />
      </div>
    </section>
  )
}
