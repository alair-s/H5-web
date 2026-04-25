import { useEffect, useRef, useState } from 'react'
import loadingImg from '../../assets/loading/loading.png'
import { sharedPngAssets } from '../Background/assets'
import { page2Assets } from '../Home/Page2/assets'
import { page3Assets } from '../Home/Page3/assets'
import { page4Assets } from '../Home/Page4/assets'
import { page5Assets } from '../Home/Page5/assets'
import { page6Assets } from '../Home/Page6/assets'
import { page7Assets } from '../Home/Page7/assets'
import { page8Assets } from '../Home/Page8/assets'
import { page9Assets } from '../Home/Page9/assets'
import { page10Assets } from '../Home/Page10/assets'
import { page11Assets } from '../Home/Page11/assets'

/** 将 assets 对象（值可能是 PngAsset 或 PngAsset[]）展平为 src 字符串数组 */
function flattenSrcs(assets: Record<string, unknown>): string[] {
  return Object.values(assets).flatMap((v) => {
    if (Array.isArray(v)) return v.map((item) => (item as { src: string }).src)
    return [(v as { src: string }).src]
  })
}

const ALL_IMAGE_SRCS: string[] = [
  ...flattenSrcs(sharedPngAssets as unknown as Record<string, unknown>),
  ...flattenSrcs(page2Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page3Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page4Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page5Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page6Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page7Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page8Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page9Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page10Assets as unknown as Record<string, unknown>),
  ...flattenSrcs(page11Assets as unknown as Record<string, unknown>),
]

const AUDIO_SRCS = [
  `${import.meta.env.BASE_URL}audio/bg.mp3`,
  `${import.meta.env.BASE_URL}audio/click.mp3`,
  `${import.meta.env.BASE_URL}audio/finish.mp3`,
]

/** 最短展示时间（ms），避免资源已缓存时 loading 一闪而过 */
const MIN_DISPLAY_MS = 1200

type Props = {
  onLoaded: () => void
}

export default function Loading({ onLoaded }: Props) {
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(Date.now())
  const doneRef = useRef(false)

  useEffect(() => {
    const total = ALL_IMAGE_SRCS.length + AUDIO_SRCS.length
    let loaded = 0

    function onOne() {
      loaded += 1
      setProgress(Math.round((loaded / total) * 100))

      if (loaded >= total && !doneRef.current) {
        doneRef.current = true
        const elapsed = Date.now() - startTimeRef.current
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
        setTimeout(onLoaded, remaining)
      }
    }

    ALL_IMAGE_SRCS.forEach((src) => {
      const img = new Image()
      img.onload = onOne
      img.onerror = onOne
      img.src = src
    })

    AUDIO_SRCS.forEach((src) => {
      const audio = new Audio()
      audio.oncanplaythrough = onOne
      audio.onerror = onOne
      audio.preload = 'auto'
      audio.src = src
    })

    // 保底：8 秒后强制进入，防止某个资源永久阻塞
    const fallback = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true
        onLoaded()
      }
    }, 8000)

    return () => clearTimeout(fallback)
  }, [onLoaded])

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#f8f6f6]">
      {/* 顶部状态栏占位 */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-sm font-bold text-[#A0C4FF]">9:41</div>
        <div className="flex items-center gap-1 text-[#A0C4FF]">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="2" y="7" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M22 11v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* 中央动画区 */}
      <div className="flex grow flex-col items-center justify-center px-8">
        <div className="relative flex w-full max-w-[280px] flex-col items-center justify-center">

          {/* 骑车图片（上下浮动） */}
          <img
            src={loadingImg}
            alt="骑车人物"
            className="w-64 h-64 object-contain"
            style={{ animation: 'ldr-bounce 0.8s ease-in-out infinite' }}
          />
        </div>

        {/* 文字 + 进度条 */}
        <div className="mt-12 w-full max-w-xs flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#221610] mb-2">
            加载中<LoadingDots />
          </h2>
          <p className="text-[#221610]/60 text-sm mb-8 text-center px-4">
            正在为您准备所有内容，马上就好！
          </p>

          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <p className="text-sm font-bold text-[#A0C4FF]">即将就绪！</p>
              <p className="text-[#7999CC] text-sm font-normal">{progress}%</p>
            </div>
            <div className="rounded-full bg-[#A0C4FF]/20 h-3 w-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#A0C4FF] transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>



      {/* CSS 动画（作用域限于此组件，避免污染全局） */}
      <style>{`
        @keyframes ldr-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  )
}

function LoadingDots() {
  const [dots, setDots] = useState('.')
  useEffect(() => {
    const cycle = ['.', '..', '...', '']
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % cycle.length
      setDots(cycle[i])
    }, 400)
    return () => clearInterval(id)
  }, [])
  return <span className="inline-block w-6 text-left">{dots}</span>
}
