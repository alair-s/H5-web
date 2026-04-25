import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import { loadAllPostcards, type PostcardRecord } from '../../data/postcardStore'
import type { HomePageProps } from '../types'
import { page11Assets } from './assets'

const PER_PAGE = 6

export default function Page11({ activePageId }: HomePageProps) {
  const isActive = activePageId === 'home-page-11'
  const [step, setStep] = useState(0)
  const finalStep = 4

  const [postcards, setPostcards] = useState<PostcardRecord[]>([])
  const [galleryPage, setGalleryPage] = useState(0)

  useEffect(() => {
    if (isActive) {
      // 最新的在前
      setPostcards(loadAllPostcards().reverse())
    } else {
      setStep(0)
      setGalleryPage(0)
    }
  }, [isActive])

  const totalPages = Math.ceil(postcards.length / PER_PAGE)
  const currentCards = postcards.slice(galleryPage * PER_PAGE, (galleryPage + 1) * PER_PAGE)

  return (
    <section
      id="home-page-11"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page11} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page11Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        {step < finalStep ? (
          <button
            type="button"
            onClick={() => setStep((c) => Math.min(c + 1, finalStep))}
            className="absolute inset-0 z-10"
            aria-label="点击显示下一项内容"
          />
        ) : null}

        {step >= 1 ? (
          <motion.div
            className="pointer-events-none absolute -top-40 z-20"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SceneImage asset={page11Assets.displayBoard} className="h-full w-full object-fill" />
          </motion.div>
        ) : null}

        {/* ── 明信片画廊（展示板上方）── */}
        {step >= 1 && postcards.length > 0 ? (
          <motion.div
            className="absolute left-[5%] right-[5%] top-10 z-21"
            style={{ zIndex: 21 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* 2 列 3 行网格 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryPage}
                className="grid grid-cols-2 gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentCards.map((card, i) => (
                  <motion.img
                    key={card.timestamp}
                    src={card.dataUrl}
                    alt={card.name}
                    className="w-full h-auto rounded-lg shadow-[0_4px_14px_rgba(0,0,0,0.18)] object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    draggable={false}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* 分页指示 + 翻页按钮 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  type="button"
                  disabled={galleryPage === 0}
                  onClick={() => setGalleryPage((p) => p - 1)}
                  className="w-8 h-8 rounded-full bg-white/80 text-gray-600 text-lg font-bold shadow disabled:opacity-30 active:scale-90 transition-transform"
                >
                  ‹
                </button>
                <span className="text-xs text-white/80 font-medium tabular-nums">
                  {galleryPage + 1} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={galleryPage >= totalPages - 1}
                  onClick={() => setGalleryPage((p) => p + 1)}
                  className="w-8 h-8 rounded-full bg-white/80 text-gray-600 text-lg font-bold shadow disabled:opacity-30 active:scale-90 transition-transform"
                >
                  ›
                </button>
              </div>
            )}
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute bottom-2  z-22"
            style={{ zIndex: 22 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, scale: 0.5 ,x:100 }}
            transition={{ duration: 0.4 ,delay: 0.5 }}
          >
            <SceneImage asset={page11Assets.text} className=" w-full object-fill" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute -bottom-10  z-23"
            style={{ zIndex: 23 }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: -30, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.35 },
              x: { duration: 0.35 },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page11Assets.character} className="w-full object-fill" />
          </motion.div>
        ) : null}


      </div>
    </section>
  )
}
