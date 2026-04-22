import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page2Assets } from './assets'

const photoCards = [
  {
    key: 'photoOne',
    asset: page2Assets.photoOne,
    stackedPosition: { left: '15%', top: '32%', width: '70%' },
    stackedRotate: -8,
    revealedPosition: { left: '6%', top: '23%', width: '72%' },
    revealedRotate: -7,
  },
  {
    key: 'photoTwo',
    asset: page2Assets.photoTwo,
    stackedPosition: { left: '15%', top: '34%', width: '70%' },
    stackedRotate: 0,
    revealedPosition: { left: '24%', top: '42%', width: '72%' },
    revealedRotate: 6,
  },
  {
    key: 'photoThree',
    asset: page2Assets.photoThree,
    stackedPosition: { left: '15%', top: '36%', width: '70%' },
    stackedRotate: 7,
    revealedPosition: { left: '9%', top: '58%', width: '70%' },
    revealedRotate: -4,
  },
] as const

export default function Page2({ activePageId, goToPage }: HomePageProps) {
  const { enablePlayback } = useBackgroundMusic()
  const isActive = activePageId === 'home-page-2'
  const [revealedCount, setRevealedCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setRevealedCount(0)
    }
  }, [isActive])

  const revealNextPhoto = () => {
    setRevealedCount((current) => Math.min(current + 1, photoCards.length))
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
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.div
          className="absolute left-1/2 top-[11%] z-10 -translate-x-1/2 rounded-full bg-white/72 px-4 py-2 text-xs tracking-[0.2em] text-slate-500 shadow-[0_10px_24px_rgba(128,145,197,0.18)] backdrop-blur-sm"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          点击照片慢慢展开
        </motion.div>

        <button
          type="button"
          onClick={revealNextPhoto}
          className="absolute inset-x-[5%] top-[18%] bottom-[26%] z-10"
          aria-label="点击展开照片"
        >
          {photoCards.map((item, index) => {
            const isRevealed = index < revealedCount

            return (
              <motion.div
                key={item.key}
                className="absolute"
                animate={{
                  left: isRevealed ? item.revealedPosition.left : item.stackedPosition.left,
                  top: isRevealed ? item.revealedPosition.top : item.stackedPosition.top,
                  width: isRevealed ? item.revealedPosition.width : item.stackedPosition.width,
                  opacity: 1,
                  scale: isRevealed ? 1 : 0.94 + index * 0.03,
                  y: isRevealed ? 0 : index * 8,
                  rotate: isRevealed ? item.revealedRotate : item.stackedRotate,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{ zIndex: photoCards.length - index }}
              >
                <SceneImage
                  asset={item.asset}
                  className="pointer-events-none block w-full drop-shadow-[0_16px_28px_rgba(94,108,153,0.22)]"
                />
              </motion.div>
            )
          })}
        </button>

        <motion.div
          className="absolute inset-x-[8%] bottom-[22%] z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: revealedCount === photoCards.length ? 1 : 0,
            y: revealedCount === photoCards.length ? 0 : 20,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <SceneImage asset={page2Assets.text} className="block w-full" />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => {
            void enablePlayback()
            goToPage?.('home-page-3')
          }}
          className="absolute inset-x-0 bottom-[8%] z-10 mx-auto w-[64%] rounded-full bg-[#6f8ee8] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_32px_rgba(111,142,232,0.24)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            opacity: { delay: 0.35, duration: 0.4 },
            y: { delay: 0.35, duration: 0.4 },
            scale: { duration: 2.1, delay: 1.1, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          继续看第三页
        </motion.button>
      </div>
    </section>
  )
}
