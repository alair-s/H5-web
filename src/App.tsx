import { useCallback, useEffect, useState } from 'react'
import { BackgroundMusicProvider } from './Component/BackgroundMusicProvider'
import Loading from './Component/Loading'
import Home from './Home'

type Phase = 'loading' | 'fading' | 'done'

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading')

  // Loading 完成 → 开始淡出
  const handleLoaded = useCallback(() => setPhase('fading'), [])

  // 淡出动画结束（550ms）→ 彻底卸载 Loading
  useEffect(() => {
    if (phase !== 'fading') return
    const id = setTimeout(() => setPhase('done'), 550)
    return () => clearTimeout(id)
  }, [phase])

  return (
    <>
      {/* fading 阶段开始就挂载 Home，淡出完成后立刻呈现，无白屏 */}
      {phase !== 'loading' && (
        <BackgroundMusicProvider>
          <Home />
        </BackgroundMusicProvider>
      )}

      {/* Loading 覆盖层：淡出时 pointer-events 关闭，不影响下层交互 */}
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-50 transition-opacity duration-500 ease-in-out"
          style={{ opacity: phase === 'fading' ? 0 : 1, pointerEvents: phase === 'fading' ? 'none' : 'auto' }}
        >
          <Loading onLoaded={handleLoaded} />
        </div>
      )}
    </>
  )
}
