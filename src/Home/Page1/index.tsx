import { motion } from 'motion/react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import { sharedPngAssets } from '../../Background/assets'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'

export default function Page1({ activePageId, goToPage }: HomePageProps) {
  const { enablePlayback } = useBackgroundMusic()
  const isActive = activePageId === 'home-page-1'

  return (
    <section
      id="home-page-1"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page1} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.22)]">
        <SceneImage
          asset={sharedPngAssets.page1Background}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.5),transparent_28%)]" />

        <motion.div
          className="absolute left-1/2 top-25 z-10 w-[84%] -translate-x-1/2"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SceneImage asset={sharedPngAssets.page1Title} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute left-25 bottom-70 z-10 w-[56%]  opacity-70"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 0.7, scale: 2 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <SceneImage
            asset={sharedPngAssets.page1Subtitle}
            className="block w-full"
          />
        </motion.div>

        <motion.div
          className="absolute left-[2%] top-1 z-8 w-[76%]"
          initial={{ opacity: 0, x: -30, y: 18 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0],
            rotate: [0, -1.5, 0],
          }}
          transition={{
            opacity: { duration: 0.55, delay: 0.18 },
            x: { duration: 0.55, delay: 0.18, ease: 'easeOut' },
            y: { duration: 4.4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: {
              duration: 4.4,
              delay: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <SceneImage asset={sharedPngAssets.page1Character} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute left-20 top-50 z-8 w-[35%]"
          initial={{ opacity: 0, scale: 2, y: 14 }}
          animate={{ opacity: 1, scale: 3.5,  }}
          transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
        >
          <SceneImage asset={sharedPngAssets.page1Bubble} className="block w-full" />
        </motion.div>



        <div className="absolute right-[9%] top-[62%] z-10 h-20 w-20 rounded-full border border-dashed border-[#9db2f3] bg-white/30" />

        <motion.button
          type="button"
          onClick={() => {
            void enablePlayback()
            goToPage?.('home-page-2')
          }}
          className="absolute inset-x-0 bottom-40 z-10 mx-auto w-[76%] bg-transparent"
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.03, 1],
            filter: [
              'drop-shadow(0 10px 18px rgba(84,102,255,0.16))',
              'drop-shadow(0 14px 28px rgba(84,102,255,0.28))',
              'drop-shadow(0 10px 18px rgba(84,102,255,0.16))',
            ],
          }}
          transition={{
            opacity: { delay: 0.62, duration: 0.4 },
            y: { delay: 0.62, duration: 0.4 },
            scale: { duration: 2.2, delay: 1, repeat: Infinity, ease: 'easeInOut' },
            filter: { duration: 2.2, delay: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <SceneImage asset={sharedPngAssets.page1Button} className="block w-full scale-130" />
        </motion.button>



        <ScrollHint />
      </div>
    </section>
  )
}
