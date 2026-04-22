import { motion } from 'motion/react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page4Assets } from './assets'

export default function Page4({ activePageId }: HomePageProps) {
  const isActive = activePageId === 'home-page-4'

  return (
    <section
      id="home-page-4"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page4} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page4Assets.background}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.div
          className="absolute left-1/2 top-[9%] z-10 w-[72%] -translate-x-1/2"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          <SceneImage asset={page4Assets.text} className="block w-full" />
        </motion.div>

        <div className="absolute inset-x-[6%] top-[26%] z-10 overflow-hidden rounded-[30px] border border-white/70 bg-white/44 shadow-[0_12px_34px_rgba(141,157,191,0.18)] backdrop-blur-sm">
          <SceneImage
            asset={page4Assets.beforeErase}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <motion.div
            className="relative overflow-hidden"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.25 }}
          >
            <SceneImage asset={page4Assets.afterErase} className="block w-full" />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute bottom-0 top-0 w-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.45),rgba(255,255,255,0.1))] blur-sm"
            initial={{ x: '-20%' }}
            whileInView={{ x: '820%' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.25 }}
          />
        </div>

        <motion.div
          className="absolute inset-x-6 bottom-[18%] z-10 rounded-[26px] bg-white/72 px-4 py-3 text-sm leading-6 text-slate-600 shadow-[0_10px_30px_rgba(142,159,197,0.16)] backdrop-blur-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          第四页做成擦拭揭晓页，编号已经前移到和资源 `page4` 一致。
        </motion.div>

        <ScrollHint />
      </div>
    </section>
  )
}
