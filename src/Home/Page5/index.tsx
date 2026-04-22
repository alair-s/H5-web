import { motion } from 'motion/react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page5Assets } from './assets'

export default function Page5({ activePageId, goToPage }: HomePageProps) {
  const { enablePlayback } = useBackgroundMusic()
  const isActive = activePageId === 'home-page-5'

  return (
    <section
      id="home-page-5"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page5} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page5Assets.background}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.div
          className="absolute left-1/2 top-[9%] z-10 w-[76%] -translate-x-1/2"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          <SceneImage asset={page5Assets.text} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute left-[6%] top-[26%] z-10 w-[56%]"
          initial={{ opacity: 0, x: -22, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            opacity: { duration: 0.5 },
            x: { duration: 0.5, ease: 'easeOut' },
            y: { duration: 3.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <SceneImage asset={page5Assets.characterOne} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute right-[7%] bottom-[18%] z-10 w-[50%]"
          initial={{ opacity: 0, x: 22, y: 18 }}
          whileInView={{ opacity: 1, x: 0, y: [0, -6, 0] }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            opacity: { delay: 0.12, duration: 0.5 },
            x: { delay: 0.12, duration: 0.5, ease: 'easeOut' },
            y: { duration: 3.5, delay: 0.9, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <SceneImage asset={page5Assets.characterTwo} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute inset-x-6 bottom-[28%] z-10 rounded-[26px] bg-white/72 px-4 py-3 text-sm leading-6 text-slate-600 shadow-[0_10px_30px_rgba(142,159,197,0.16)] backdrop-blur-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          第五页保留双角色互动页的结构，但资源、编号和文件名都已经统一。
        </motion.div>

        <motion.button
          type="button"
          onClick={() => {
            void enablePlayback()
            goToPage?.('home-page-6')
          }}
          className="absolute inset-x-0 bottom-[8%] z-10 mx-auto w-[64%] rounded-full bg-[#6f8ee8] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_32px_rgba(111,142,232,0.24)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            opacity: { delay: 0.36, duration: 0.4 },
            y: { delay: 0.36, duration: 0.4 },
            scale: { duration: 2.1, delay: 1.1, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          去拼图小游戏
        </motion.button>
      </div>
    </section>
  )
}
