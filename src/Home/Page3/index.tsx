import { motion } from 'motion/react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page3Assets } from './assets'

const placeCards = [
  {
    key: 'zhongshanRoad',
    asset: page3Assets.zhongshanRoad,
    className: 'absolute left-[3%] top-[28%] w-[66%] rotate-[-6deg]',
  },
  {
    key: 'alley',
    asset: page3Assets.alley,
    className: 'absolute right-[2%] top-[48%] w-[72%] rotate-[3deg]',
  },
  {
    key: 'twinTowers',
    asset: page3Assets.twinTowers,
    className: 'absolute left-[6%] bottom-[14%] w-[54%] rotate-[-4deg]',
  },
  {
    key: 'bungalow',
    asset: page3Assets.bungalow,
    className: 'absolute right-[7%] bottom-[12%] w-[36%] rotate-[5deg]',
  },
] as const

export default function Page3({ activePageId, goToPage }: HomePageProps) {
  const { enablePlayback } = useBackgroundMusic()
  const isActive = activePageId === 'home-page-3'

  return (
    <section
      id="home-page-3"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page3} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page3Assets.background}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.18))]" />

        <motion.div
          className="absolute left-[6%] top-[8%] z-10 w-[42%]"
          initial={{ opacity: 0, x: -24, y: 12 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          <SceneImage asset={page3Assets.ip} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute right-[5%] top-[12%] z-10 w-[34%]"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12, duration: 0.4 }}
        >
          <SceneImage asset={page3Assets.bubble} className="block w-full" />
        </motion.div>

        {placeCards.map((item, index) => (
          <motion.div
            key={item.key}
            className={`${item.className} z-10`}
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
          >
            <SceneImage asset={item.asset} className="block w-full" />
          </motion.div>
        ))}

        <motion.div
          className="absolute inset-x-5 bottom-[21%] z-10 rounded-[26px] bg-white/78 px-4 py-3 text-xs leading-5 text-slate-600 shadow-[0_12px_28px_rgba(130,148,190,0.16)] backdrop-blur-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          第三页保留多景点拼贴结构，现在资源路径和编号都已经跟页面一致。
        </motion.div>

        <motion.button
          type="button"
          onClick={() => {
            void enablePlayback()
            goToPage?.('home-page-4')
          }}
          className="absolute inset-x-0 bottom-[11%] z-10 mx-auto w-[60%] rounded-full bg-[#6f8ee8] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_32px_rgba(111,142,232,0.24)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            opacity: { delay: 0.34, duration: 0.4 },
            y: { delay: 0.34, duration: 0.4 },
            scale: { duration: 2.1, delay: 1.1, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          继续看第四页
        </motion.button>
      </div>
    </section>
  )
}
