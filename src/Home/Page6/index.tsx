import { motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page6Assets } from './assets'

type Phase = 'puzzle' | 'flash' | 'complete'

// Stable per-piece rotations for the pile display
const PIECE_ROTATIONS = [5, -8, 3, -6, 9, -4, 7, -3, 6]

function genPileOrder(): number[] {
  const arr = Array.from({ length: 9 }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function Page6({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-6'

  // slots[i] = piece index placed at slot i (null if empty)
  // With the "correct-only" mechanic, slots[i] === i when placed
  const [slots, setSlots] = useState<(number | null)[]>(Array(9).fill(null))
  const [pileOrder] = useState<number[]>(() => genPileOrder())
  const [dragging, setDragging] = useState<{ pieceIndex: number; x: number; y: number } | null>(null)
  const [hoveringSlot, setHoveringSlot] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('puzzle')
  const [showStep, setShowStep] = useState(false)

  const slotRefs = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null))
  const phaseRef = useRef<Phase>('puzzle')
  phaseRef.current = phase

  // Reset when page becomes inactive
  useEffect(() => {
    if (!isActive) {
      setSlots(Array(9).fill(null))
      setDragging(null)
      setHoveringSlot(null)
      setPhase('puzzle')
      setShowStep(false)
      return
    }
    const t = setTimeout(() => setShowStep(true), 500)
    return () => clearTimeout(t)
  }, [isActive])

  // Watch for puzzle completion
  useEffect(() => {
    if (phaseRef.current !== 'puzzle') return
    if (!slots.every((v, i) => v === i)) return

    const t1 = setTimeout(() => setPhase('flash'), 300)
    const t2 = setTimeout(() => setPhase('complete'), 1900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [slots])

  const placedPieces = useMemo(
    () => new Set(slots.filter((s): s is number => s !== null)),
    [slots],
  )
  const unplacedPiecesList = useMemo(
    () => pileOrder.filter((i) => !placedPieces.has(i)),
    [pileOrder, placedPieces],
  )

  const handlePiecePointerDown = useCallback(
    (e: React.PointerEvent, pieceIndex: number) => {
      if (phaseRef.current !== 'puzzle') return
      e.preventDefault()
      e.stopPropagation()

      setDragging({ pieceIndex, x: e.clientX, y: e.clientY })

      const onMove = (ev: PointerEvent) => {
        setDragging((prev) => (prev ? { ...prev, x: ev.clientX, y: ev.clientY } : null))

        let hovering: number | null = null
        for (let i = 0; i < 9; i++) {
          const slot = slotRefs.current[i]
          if (!slot) continue
          const rect = slot.getBoundingClientRect()
          if (
            ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom
          ) {
            hovering = i
            break
          }
        }
        setHoveringSlot(hovering)
      }

      const onUp = (ev: PointerEvent) => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)

        // Find drop target
        let targetSlot: number | null = null
        for (let i = 0; i < 9; i++) {
          const slot = slotRefs.current[i]
          if (!slot) continue
          const rect = slot.getBoundingClientRect()
          if (
            ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom
          ) {
            targetSlot = i
            break
          }
        }

        setDragging(null)
        setHoveringSlot(null)

        // Only accept correct placement (piece index must match slot index)
        if (targetSlot !== null && targetSlot === pieceIndex) {
          setSlots((prev) => {
            if (prev[targetSlot!] !== null) return prev
            const next = [...prev]
            next[targetSlot!] = pieceIndex
            return next
          })
        }
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    },
    [],
  )

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


        <img
          src={page6Assets.title.src}
          alt={page6Assets.title.alt}
          className="absolute inset-0 z-10 h-full w-full select-none object-fill pointer-events-none"
          draggable={false}
        />

        {/* ── TOP HALF: reference grid + puzzle slots ── */}
        <div className="absolute inset-x-5 top-25 flex flex-col items-center">
          {/* Step 1 indicator */}

    

          {/* Puzzle grid: square, constrained to fit the upper half */}
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-[0_8px_28px_rgba(60,80,140,0.22)]"
            style={{ aspectRatio: '1 / 1', maxWidth: 'min(100%, calc(44vh - 3rem))' }}
          >
            {/* Layer 1 (bottom): reference image at 25% opacity — always visible as hint */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {page6Assets.pieces.map((piece, i) => (
                <img
                  key={i}
                  src={piece.src}
                  alt=""
                  className="block h-full w-full select-none object-cover"
                  draggable={false}
                />
              ))}
            </div>

            {/* Layer 2: dark overlay + per-slot shadows (puzzle phase only) */}
            {phase === 'puzzle' ? (
              <>
                {/* Global dim so reference image looks like a faint ghost */}
                <div className="absolute inset-0 bg-slate-900/55" />

                {/* Individual slot cells */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px] p-[2px]">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        slotRefs.current[i] = el
                      }}
                      className={[
                        'relative overflow-hidden transition-all duration-150',
                        slots[i] !== null
                          ? ''
                          : hoveringSlot === i
                            ? 'bg-sky-300/35 ring-2 ring-inset ring-sky-300'
                            : 'bg-slate-800/50',
                      ].join(' ')}
                    >
                      {slots[i] !== null ? (
                        <motion.img
                          src={page6Assets.pieces[slots[i] as number].src}
                          alt=""
                          className="block h-full w-full select-none object-cover"
                          initial={{ opacity: 0, scale: 0.78 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          draggable={false}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">

                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {/* Layer 3: fully assembled image (flash + complete phases) */}
            {phase !== 'puzzle' ? (
              <motion.div
                className="absolute inset-0 grid grid-cols-3 grid-rows-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {page6Assets.pieces.map((piece, i) => (
                  <img
                    key={i}
                    src={piece.src}
                    alt=""
                    className="block h-full w-full select-none object-cover"
                    draggable={false}
                  />
                ))}
              </motion.div>
            ) : null}

            {/* Layer 4: flash sparkle effects (from Page4 style) */}
            {phase === 'flash' ? (
              <>
                <motion.div
                  className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(255,255,255,0)_58%)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-[-24%] z-30 w-1/3 rotate-12 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.82),rgba(255,255,255,0))] blur-md"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: '420%', opacity: [0, 1, 0] }}
                  transition={{ duration: 1.0, ease: 'easeOut' }}
                />
                <motion.span
                  className="pointer-events-none absolute left-3 top-3 z-30 text-2xl text-white"
                  initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.8], rotate: [-12, 0, 12] }}
                  transition={{ duration: 0.95, delay: 0.1, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="pointer-events-none absolute right-4 top-4 z-30 text-3xl text-white"
                  initial={{ opacity: 0, scale: 0.5, rotate: 8 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.75], rotate: [8, 0, -8] }}
                  transition={{ duration: 1.05, delay: 0.2, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 text-2xl text-white"
                  initial={{ opacity: 0, scale: 0.5, x: '-50%' }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], x: '-50%' }}
                  transition={{ duration: 0.95, delay: 0.28, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="pointer-events-none absolute bottom-4 right-3 z-30 text-xl text-white"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 0.75], rotate: [-10, 0, 10] }}
                  transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                >
                  ✦
                </motion.span>
              </>
            ) : null}
          </div>
        </div>

        {/* ── BOTTOM HALF: shuffled piece pile ── */}
        {phase === 'puzzle' ? (
          <div className="absolute inset-x-5 bottom-16" style={{ top: 'calc(44vh + 4.5rem)' }}>
            <div className="flex h-full flex-wrap content-start items-start justify-center gap-2 overflow-hidden pt-1">
              {unplacedPiecesList.map((pieceIndex) => {
                const isDragged = dragging?.pieceIndex === pieceIndex
                return (
                  <motion.div
                    key={pieceIndex}
                    className={[
                      'touch-none cursor-grab overflow-hidden rounded-lg shadow-md',
                      'transition-opacity duration-150',
                      isDragged ? 'opacity-25' : 'opacity-100',
                    ].join(' ')}
                    style={{
                      width: 'calc(33% - 6px)',
                      rotate: PIECE_ROTATIONS[pieceIndex],
                    }}
                    whileTap={{ scale: 1.08 }}
                    onPointerDown={(e) => handlePiecePointerDown(e, pieceIndex)}
                  >
                    <img
                      src={page6Assets.pieces[pieceIndex].src}
                      alt={`拼图碎片 ${pieceIndex + 1}`}
                      className="block w-full select-none"
                      draggable={false}
                    />
                  </motion.div>
                )
              })}

            </div>
          </div>
        ) : null}

        {/* Floating dragged piece (follows cursor / finger) */}
        {dragging ? (
          <div
            className="pointer-events-none fixed z-50 overflow-hidden rounded-lg shadow-2xl"
            style={{
              width: 82,
              left: dragging.x - 41,
              top: dragging.y - 41,
              transform: 'scale(1.12)',
            }}
          >
            <img
              src={page6Assets.pieces[dragging.pieceIndex].src}
              alt=""
              className="block w-full select-none"
              draggable={false}
            />
          </div>
        ) : null}

        {/* Complete: full-page success overlay, click to next page */}
        {phase === 'complete' ? (
          <motion.img
            src={page6Assets.successEmoji.src}
            alt={page6Assets.successEmoji.alt}
            className="absolute z-40   cursor-pointer bottom-10 "
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={() => goToPage?.('home-page-7')}
          />
        ) : null}

        <ScrollHint />
      </div>
    </section>
  )
}
