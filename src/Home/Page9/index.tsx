import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import { useBackgroundMusic } from '../../Component/BackgroundMusicProvider'
import PageMusic from '../../Component/PageMusic'
import ScrollHint from '../../Component/ScrollHint'
import SceneImage from '../../UI/SceneImage'
import { loadLatestPostcard, updateLatestPostcard } from '../../data/postcardStore'
import type { HomePageProps } from '../types'
import { page9Assets } from './assets'

export default function Page9({ activePageId, goToPage }: HomePageProps) {
  const isActive = activePageId === 'home-page-9'
  const { playFinish } = useBackgroundMusic()

  // 入场步骤：0=初始, 1=女孩, 2=对话框
  const [introStep, setIntroStep] = useState(0)

  // 从 data store 读取到的明信片
  const [postcardUrl, setPostcardUrl] = useState<string | null>(null)

  // 印章拖拽
  const [stampXPct, setStampXPct] = useState(50)
  const [stampYPct, setStampYPct] = useState(82)
  const [isDragging, setIsDragging] = useState(false)

  // 印章特效阶段：idle → pressing → stamped
  const [stampPhase, setStampPhase] = useState<'idle' | 'pressing' | 'stamped'>('idle')

  const containerRef = useRef<HTMLDivElement>(null)
  const postcardAreaRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ px: number; py: number; sx: number; sy: number } | null>(null)

  useEffect(() => {
    if (isActive) {
      // 加载最新明信片
      const latest = loadLatestPostcard()
      setPostcardUrl(latest?.dataUrl ?? null)

      // 自动入场动画
      const t1 = setTimeout(() => setIntroStep(1), 300)
      const t2 = setTimeout(() => setIntroStep(2), 900)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    } else {
      setIntroStep(0)
      setStampXPct(50)
      setStampYPct(82)
      setIsDragging(false)
      setStampPhase('idle')
      setPostcardUrl(null)
    }
  }, [isActive])

  // ── 拖拽印章 ────────────────────────────────────────────────
  const onStampPointerDown = (e: React.PointerEvent) => {
    if (stampPhase !== 'idle') return
    e.stopPropagation()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    dragStart.current = {
      px: e.clientX,
      py: e.clientY,
      sx: stampXPct,
      sy: stampYPct,
    }
    setIsDragging(true)
  }

  const onStampPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !containerRef.current) return
    const { width, height } = containerRef.current.getBoundingClientRect()
    const nx = Math.max(8, Math.min(92, dragStart.current.sx + ((e.clientX - dragStart.current.px) / width) * 100))
    const ny = Math.max(5, Math.min(95, dragStart.current.sy + ((e.clientY - dragStart.current.py) / height) * 100))
    setStampXPct(nx)
    setStampYPct(ny)
  }

  const onStampPointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current) return
    dragStart.current = null
    setIsDragging(false)

    if (!postcardAreaRef.current) return

    // postcardAreaRef 内的图片有 scale:1.2，视觉区域比 rect 大
    // scale 从中心扩展，四边各扩 10%（0.1 = (1.2-1)/2）
    const r = postcardAreaRef.current.getBoundingClientRect()
    const ex = r.width * 0.1
    const ey = r.height * 0.1
    const isOnPostcard =
      e.clientX >= r.left - ex &&
      e.clientX <= r.right + ex &&
      e.clientY >= r.top - ey &&
      e.clientY <= r.bottom + ey

    if (isOnPostcard) {
      triggerStampEffect()
    }
  }

  // ── 将邮戳合成到明信片并更新 store ──────────────────────────
  const compositeAndSave = (baseDataUrl: string, postmarkSrc: string) => {
    const canvas = document.createElement('canvas')
    const baseImg = new Image()
    baseImg.onload = () => {
      canvas.width = baseImg.naturalWidth
      canvas.height = baseImg.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(baseImg, 0, 0)

      const pmImg = new Image()
      pmImg.onload = () => {
        // 邮戳位置与 UI 中的 right-[4%] bottom-[4%] w-[36%] 对应
        const pmW = 0.36 * canvas.width
        const pmH = (pmImg.naturalHeight / pmImg.naturalWidth) * pmW
        const pmX = canvas.width - pmW - 0.01 * canvas.width
        const pmY = canvas.height - pmH - 0.01 * canvas.height

        // 以邮戳中心为旋转原点，旋转 -8°（与 UI 动画一致）
        ctx.save()
        ctx.globalCompositeOperation = 'multiply'
        ctx.globalAlpha = 0.88
        ctx.translate(pmX + pmW / 2, pmY + pmH / 2)
        ctx.rotate((-8 * Math.PI) / 180)
        ctx.drawImage(pmImg, -pmW / 2, -pmH / 2, pmW, pmH)
        ctx.restore()

        updateLatestPostcard(canvas.toDataURL('image/png'))
      }
      pmImg.src = postmarkSrc
    }
    baseImg.src = baseDataUrl
  }

  // ── 盖章特效 ────────────────────────────────────────────────
  const triggerStampEffect = () => {
    setStampPhase('pressing')
    setTimeout(() => {
      setStampPhase('stamped')
      playFinish()
      // 盖章完成后将邮戳合成到明信片并更新 store
      if (postcardUrl) {
        compositeAndSave(postcardUrl, page9Assets.postmark.src)
      }
    }, 600)
  }

  const handleAfterStamp = () => {
    if (stampPhase === 'stamped') {
      goToPage?.('home-page-10')
    }
  }

  return (
    <section
      id="home-page-9"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page9} />

      <div
        ref={containerRef}
        className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)]"
      >
        {/* 背景 */}
        <SceneImage
          asset={page9Assets.background}
          className="absolute inset-0 h-full w-full object-fill"
        />

        {/* 盖章完成后点击前进 */}
        {stampPhase === 'stamped' && (
          <button
            type="button"
            onClick={handleAfterStamp}
            className="absolute inset-0 z-10"
            aria-label="点击进入下一页"
          />
        )}

        {/* ── 女孩入场 ── */}
        <AnimatePresence>
          {introStep >= 1 && (
            <motion.div
              className="pointer-events-none absolute bottom-20 z-20"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 ,scale: 1.1}}
              transition={{ duration: 0.45 }}
            >
              <SceneImage asset={page9Assets.girl} className="w-full object-fill" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 对话框 ── */}
        <AnimatePresence>
          {introStep >= 2 && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <SceneImage asset={page9Assets.dialogBubble} className="h-full w-full object-fill" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 明信片展示区（来自 data store）── */}
        <div
          ref={postcardAreaRef}
          className="pointer-events-none absolute left-[12%] top-30 w-[76%] z-25"
          style={{ zIndex: 25 }}
        >
          {postcardUrl ? (
            <motion.img
              src={postcardUrl}
              alt="我的明信片"
              className="w-full h-auto rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              draggable={false}
            />
          ) : (
            // 没有保存的明信片时显示占位
            <motion.div
              className="w-full aspect-3/2 rounded-lg bg-[#fdf5f2] border-2 border-dashed border-[#f0d8d0] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-[#c9a89a] text-sm text-center px-4">先去制作一张明信片吧～</span>
            </motion.div>
          )}

          {/* 邮戳印迹（盖章后出现，右下角）*/}
          <AnimatePresence>
            {stampPhase === 'stamped' && (
              <motion.div
                className="absolute right-[1%] bottom-[1%] w-[36%] mix-blend-multiply"
                initial={{ opacity: 0, scale: 1.3, rotate: -5 }}
                animate={{ opacity: 0.88, scale: 1, rotate: -8 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <SceneImage asset={page9Assets.postmark} className="block w-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 提示文字 ── */}
        {stampPhase === 'idle' && postcardUrl && introStep >= 2 && (
          <motion.div
            className="pointer-events-none absolute top-10 left-0 right-0 flex justify-center z-30"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <span className="text-lg text-[#8b6659] bg-white/70 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-sm">
              把印章拖到明信片上盖章 ✉️
            </span>
          </motion.div>
        )}

        {/* ── 可拖拽印章：外层普通 div 负责定位+事件，内层 motion.div 负责动画 ── */}
        {stampPhase !== 'stamped' && (
          <div
            className="absolute z-40 touch-none select-none"
            style={{
              left: `${stampXPct}%`,
              top: `${stampYPct}%`,
              transform: 'translate(-50%, -50%)',
              width: '22%',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onPointerDown={onStampPointerDown}
            onPointerMove={onStampPointerMove}
            onPointerUp={onStampPointerUp}
            onPointerCancel={() => { dragStart.current = null; setIsDragging(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: stampPhase === 'pressing'
                  ? [1, 0.75, 1.08, 1]
                  : isDragging
                    ? 1
                    : [1, 1.3, 1],
              }}
              transition={
                stampPhase === 'pressing'
                  ? { duration: 0.5, times: [0, 0.3, 0.7, 1] }
                  : isDragging
                    ? { duration: 0.15 }
                    : { duration: 1.8, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <SceneImage
                asset={page9Assets.stamp}
                className="block w-full drop-shadow-[0_14px_24px_rgba(98,71,53,0.25)] pointer-events-none"
              />
            </motion.div>
          </div>
        )}

        {/* 盖章完成提示 */}
        <AnimatePresence>
          {stampPhase === 'stamped' && (
            <motion.div
              className="absolute top-10 left-0 right-0 flex justify-center z-30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="text-lg text-[#8b6659] bg-white/80 rounded-full px-5 py-2 shadow-sm backdrop-blur-sm">
                盖章成功！点击继续 ➜
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollHint />
      </div>
    </section>
  )
}
