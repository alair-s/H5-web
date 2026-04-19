import { motion } from 'motion/react'
import ScrollHint from '../../Component/ScrollHint'
import { sharedPngAssets } from '../../Background/assets'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'

export default function Page1({ goToPage }: HomePageProps) {
  return (
    <section
      id="home-page-1"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.22)]">
        <SceneImage
          asset={sharedPngAssets.page1Background}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.5),transparent_28%)]" />

        <motion.div
          className="absolute left-1/2 top-[7.5%] z-10 w-[84%] -translate-x-1/2"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SceneImage asset={sharedPngAssets.page1Title} className="block w-full" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-[28%] z-10 w-[56%] -translate-x-1/2 opacity-70 mix-blend-multiply"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <SceneImage
            asset={sharedPngAssets.page1Subtitle}
            className="block w-full"
          />
        </motion.div>

        <motion.div
          className="absolute left-[2%] top-[18%] z-10 w-[76%]"
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
          className="absolute right-[4%] top-[25%] z-10 w-[35%]"
          initial={{ opacity: 0, scale: 0.75, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
        >
          <SceneImage asset={sharedPngAssets.page1Bubble} className="block w-full" />
        </motion.div>

        <div className="absolute left-[8%] top-[54%] z-10 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-xs text-slate-600 backdrop-blur-sm">
          Layered PNG Scene
        </div>

        <div className="absolute right-[9%] top-[62%] z-10 h-20 w-20 rounded-full border border-dashed border-[#9db2f3] bg-white/30" />

        <motion.button
          type="button"
          onClick={() => goToPage?.('home-page-2')}
          className="absolute inset-x-0 bottom-[11%] z-10 mx-auto w-[76%] bg-transparent"
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
          <SceneImage asset={sharedPngAssets.page1Button} className="block w-full" />
        </motion.button>

        <motion.div
          className="absolute inset-x-5 bottom-[4.8rem] z-10 rounded-[24px] bg-white/58 px-4 py-3 text-xs leading-5 text-slate-700 backdrop-blur-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.45 }}
        >
          首页做成大图层沉浸式首屏，人物、标题、气泡和按钮全部独立管理，
          后面往下滚动就进入内容分页。
        </motion.div>

        <ScrollHint />
      </div>
    </section>
  )
}
