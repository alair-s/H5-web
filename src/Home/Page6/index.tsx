import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page6Assets } from './assets'

function shuffledOrder() {
  const values = Array.from({ length: 9 }, (_, index) => index)

  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[values[index], values[swapIndex]] = [values[swapIndex], values[index]]
  }

  if (values.every((value, index) => value === index)) {
    ;[values[0], values[1]] = [values[1], values[0]]
  }

  return values
}

export default function Page6({ activePageId }: HomePageProps) {
  const [order, setOrder] = useState<number[]>(() => shuffledOrder())
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [step, setStep] = useState(0)
  const isActive = activePageId === 'home-page-6'
  const isSolved = order.every((value, index) => value === index)

  useEffect(() => {
    if (!isActive) {
      setStep(0)
    }
  }, [isActive])

  useEffect(() => {
    if (isSolved) {
      setSelectedIndex(null)
    }
  }, [isSolved])

  const handlePieceClick = (index: number) => {
    if (step < 4) {
      return
    }

    if (isSolved) {
      return
    }

    if (selectedIndex === null) {
      setSelectedIndex(index)
      return
    }

    if (selectedIndex === index) {
      setSelectedIndex(null)
      return
    }

    setOrder((current) => {
      const next = [...current]
      ;[next[selectedIndex], next[index]] = [next[index], next[selectedIndex]]
      return next
    })
    setSelectedIndex(null)
  }

  const resetPuzzle = () => {
    setOrder(shuffledOrder())
    setSelectedIndex(null)
  }

  const revealNext = () => {
    setStep((current) => Math.min(current + 1, 4))
  }

  const placedCount = order.filter((value, index) => value === index).length

  return (
    <section
      id="home-page-6"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page6} />
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]">
        <SceneImage
          asset={page6Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        {step < 4 ? (
          <button
            type="button"
            onClick={revealNext}
            className="absolute inset-0 z-10"
            aria-label="点击显示下一项内容"
          />
        ) : null}

        {step >= 1 ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-6 z-20 w-3/4 -translate-x-1/2"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <SceneImage asset={page6Assets.title} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 2 ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-18 z-20 w-1/5 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <SceneImage asset={page6Assets.successEmoji} className="block w-full" />
          </motion.div>
        ) : null}

        {step >= 3 ? (
          <motion.div
            className="absolute left-1/2 top-30 z-20 w-7/12 -translate-x-1/2 rounded-[22px] border-[6px] border-[#495474]/90 bg-white/72 p-2 shadow-[0_18px_34px_rgba(92,104,141,0.16)] backdrop-blur-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className={`relative overflow-hidden rounded-[14px] ${step < 4 ? 'pointer-events-none' : ''}`}>
              <SceneImage
                asset={page6Assets.completedPuzzle}
                className="block w-full opacity-25"
              />
              <div className="absolute inset-0 grid grid-cols-3 gap-[2px] bg-[#495474]/40 p-[2px]">
                {order.map((pieceIndex, index) => {
                  const piece = page6Assets.pieces[pieceIndex]
                  const isSelected = selectedIndex === index
                  const isPlaced = pieceIndex === index

                  return (
                    <button
                      key={`${piece.alt}-${index}`}
                      type="button"
                      onClick={() => handlePieceClick(index)}
                      className={`relative overflow-hidden bg-white/70 transition ${
                        isSelected ? 'ring-4 ring-[#6f8ee8]' : ''
                      } ${isPlaced ? 'shadow-[inset_0_0_0_2px_rgba(80,180,120,0.65)]' : ''}`}
                    >
                      <img
                        src={piece.src}
                        alt={piece.alt}
                        className="block w-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}

        {step >= 4 ? (
          <>
            <motion.div
              className="absolute inset-x-6 bottom-26 z-20 rounded-[26px] bg-white/78 px-4 py-3 text-sm leading-6 text-slate-600 shadow-[0_10px_30px_rgba(142,159,197,0.16)] backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              玩法：点击两块碎片交换位置。当前完成 {placedCount}/9。
              {isSolved ? ' 已完成拼图。' : ' 把九块都放回正确位置。'}
            </motion.div>

            <div className="absolute inset-x-0 bottom-14 z-20 flex justify-center gap-3">
              <motion.button
                type="button"
                onClick={resetPuzzle}
                className="rounded-full border border-[#6f8ee8]/30 bg-white/82 px-5 py-3 text-sm font-medium text-[#5a75d9] shadow-[0_10px_24px_rgba(111,142,232,0.16)]"
                whileTap={{ scale: 0.97 }}
              >
                重新打乱
              </motion.button>

              {isSolved ? (
                <motion.div
                  className="rounded-full bg-[#6f8ee8] px-5 py-3 text-sm font-medium text-white shadow-[0_16px_32px_rgba(111,142,232,0.24)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  拼图完成
                </motion.div>
              ) : null}
            </div>
          </>
        ) : null}

        <ScrollHint />
      </div>
    </section>
  )
}
