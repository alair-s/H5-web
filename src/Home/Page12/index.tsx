import { motion } from 'motion/react'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page12Assets } from './assets'

export default function Page12({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-12'

  return (
    <section
      id="home-page-12"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page12Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        <motion.button
          type="button"
          onClick={() => goToPage?.('home-page-1')}
          className="absolute left-1/2 bottom-50 z-10 min-h-14 min-w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/88 px-8 text-lg font-bold text-[#5a6fa8] shadow-[0_14px_30px_rgba(90,111,168,0.24)] backdrop-blur-md"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.04, 1],
          }}
          transition={{
            opacity: { duration: 0.4, ease: 'easeOut' },
            y: { duration: 0.4, ease: 'easeOut' },
            scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileTap={{ scale: 0.94 }}
          aria-label="再次游玩"
        >
          再次游玩
        </motion.button>
      </div>
    </section>
  )
}
