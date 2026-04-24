import { motion } from 'motion/react'
import { useEffect } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page5Assets } from '../Page5/assets'

export default function Page5Pre({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-5-pre'

  useEffect(() => {}, [isActive])

  const handleClick = () => {
    goToPage?.('home-page-5')
  }

  return (
    <section
      id="home-page-5-pre"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page5} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page5Assets.bgflower}
          className="absolute inset-0 h-full w-full object-fill"
        />

        {/* 点击区域 */}
        <button
          type="button"
          onClick={handleClick}
          className="absolute inset-0 z-20"
          aria-label="点击进入下一页"
        />

        {/* 动画小手引导 */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-3">
            {/* 涟漪光圈 */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute rounded-full bg-white/30"
                animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                style={{ width: 64, height: 64 }}
              />
              <motion.div
                className="absolute rounded-full bg-white/20"
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                style={{ width: 64, height: 64 }}
              />

              {/* 小手图标 */}
              <motion.div
                className="relative z-10 flex h-16 w-16 items-center justify-center "
                animate={{
                  scale: [2, 1, 2],
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.45, 1],
                }}
              >
                <span className="select-none text-3xl leading-none">👆</span>
              </motion.div>
            </div>

            {/* 提示文字 */}
            <motion.p
              className="rounded-full bg-white/50 px-4 py-1.5 text-xl font-medium text-white shadow backdrop-blur-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              点击继续
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
