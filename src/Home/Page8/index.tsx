import html2canvas from 'html2canvas'
import { useEffect, useRef, useState } from 'react'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import SceneImage from '../../UI/SceneImage'
import type { HomePageProps } from '../types'
import { page8Assets } from './assets'
import ScrollHint from '../../Component/ScrollHint'

// ─── 贴纸分类定义 ────────────────────────────────────────────
type CategoryId = 'emoji' | 'objects' | 'scenery'

interface StickerDef {
  key: string
  src: string
  alt: string
  /** 风景照片默认放置尺寸更大 */
  defaultWidthPct: number
  /** 该类型的最小/最大缩放范围 */
  minPct: number
  maxPct: number
}

const CATEGORIES: { id: CategoryId; label: string; icon: string; stickers: StickerDef[] }[] = [
  {
    id: 'emoji',
    label: '表情包',
    icon: '😊',
    stickers: [
      { key: 'emoji', src: page8Assets.emoji.src, alt: page8Assets.emoji.alt, defaultWidthPct: 22, minPct: 8, maxPct: 48 },
      { key: 'emoji5', src: page8Assets.emoji5.src, alt: page8Assets.emoji5.alt, defaultWidthPct: 22, minPct: 8, maxPct: 48 },
      { key: 'emoji6', src: page8Assets.emoji6.src, alt: page8Assets.emoji6.alt, defaultWidthPct: 22, minPct: 8, maxPct: 48 },
      { key: 'emoji7', src: page8Assets.emoji7.src, alt: page8Assets.emoji7.alt, defaultWidthPct: 22, minPct: 8, maxPct: 48 },
      { key: 'emoji8', src: page8Assets.emoji8.src, alt: page8Assets.emoji8.alt, defaultWidthPct: 22, minPct: 8, maxPct: 48 },
      { key: 'emoji9', src: page8Assets.emoji9.src, alt: page8Assets.emoji9.alt, defaultWidthPct: 22, minPct: 8, maxPct: 48 },
    ],
  },
  {
    id: 'objects',
    label: '物品',
    icon: '🎀',
    stickers: [
      { key: 'bougainvillea', src: page8Assets.bougainvillea.src, alt: page8Assets.bougainvillea.alt, defaultWidthPct: 24, minPct: 8, maxPct: 50 },
      { key: 'candy', src: page8Assets.candy.src, alt: page8Assets.candy.alt, defaultWidthPct: 18, minPct: 8, maxPct: 46 },
      { key: 'conch', src: page8Assets.conch.src, alt: page8Assets.conch.alt, defaultWidthPct: 20, minPct: 8, maxPct: 46 },
      { key: 'crab', src: page8Assets.crab.src, alt: page8Assets.crab.alt, defaultWidthPct: 22, minPct: 8, maxPct: 50 },
      { key: 'palmTree', src: page8Assets.palmTree.src, alt: page8Assets.palmTree.alt, defaultWidthPct: 28, minPct: 10, maxPct: 55 },
      { key: 'seagull', src: page8Assets.seagull.src, alt: page8Assets.seagull.alt, defaultWidthPct: 24, minPct: 8, maxPct: 50 },
      { key: 'shellOne', src: page8Assets.shellOne.src, alt: page8Assets.shellOne.alt, defaultWidthPct: 18, minPct: 8, maxPct: 44 },
      { key: 'shellTwo', src: page8Assets.shellTwo.src, alt: page8Assets.shellTwo.alt, defaultWidthPct: 18, minPct: 8, maxPct: 44 },
      { key: 'star', src: page8Assets.star.src, alt: page8Assets.star.alt, defaultWidthPct: 14, minPct: 6, maxPct: 36 },
      { key: 'wave', src: page8Assets.wave.src, alt: page8Assets.wave.alt, defaultWidthPct: 30, minPct: 12, maxPct: 58 },
    ],
  },
  {
    id: 'scenery',
    label: '风景',
    icon: '🏖️',
    stickers: [
      { key: 'xmu2', src: page8Assets.xmu2.src, alt: page8Assets.xmu2.alt, defaultWidthPct: 44, minPct: 20, maxPct: 72 },
      { key: 'twinTowers', src: page8Assets.twinTowers.src, alt: page8Assets.twinTowers.alt, defaultWidthPct: 44, minPct: 20, maxPct: 72 },
      { key: 'shaPoWei', src: page8Assets.shaPoWei.src, alt: page8Assets.shaPoWei.alt, defaultWidthPct: 44, minPct: 20, maxPct: 72 },
      { key: 'jiMei1', src: page8Assets.jiMei1.src, alt: page8Assets.jiMei1.alt, defaultWidthPct: 44, minPct: 20, maxPct: 72 },
      { key: 'jiMei2', src: page8Assets.jiMei2.src, alt: page8Assets.jiMei2.alt, defaultWidthPct: 44, minPct: 20, maxPct: 72 },
      { key: 'jiMei3', src: page8Assets.jiMei3.src, alt: page8Assets.jiMei3.alt, defaultWidthPct: 44, minPct: 20, maxPct: 72 },
    ],
  },
]

const TEXT_COLORS = ['#1a1a1a', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899']

let _uid = 0
const genId = () => `item-${(++_uid).toString()}`

// ─── 数据类型 ────────────────────────────────────────────────
interface StickerItem {
  id: string
  type: 'sticker'
  src: string
  alt: string
  x: number       // % left (centre)
  y: number       // % top  (centre)
  widthPct: number  // % of postcard width
  minPct: number
  maxPct: number
}

interface TextItem {
  id: string
  type: 'text'
  content: string
  color: string
  x: number
  y: number
  fontSize: number  // px
  editing: boolean
}

type PlacedItem = StickerItem | TextItem

interface DragState {
  id: string
  px: number; py: number
  ix: number; iy: number
}

// ─── 主组件 ──────────────────────────────────────────────────
export default function Page8({ activePageId }: HomePageProps) {
  const isActive = activePageId === 'home-page-8'

  const [items, setItems] = useState<PlacedItem[]>([])
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [pickedColor, setPickedColor] = useState(TEXT_COLORS[0])
  const [capturing, setCapturing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const postcardRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const dragMoved = useRef(false)

  useEffect(() => {
    if (!isActive) {
      setActiveCategory(null)
      setEditingId(null)
      setSelectedId(null)
      setPreviewUrl(null)
      setItems(prev =>
        prev.map(i => (i.type === 'text' && i.editing ? { ...i, editing: false } : i)),
      )
    }
  }, [isActive])

  // ── 放置贴纸 ──────────────────────────────────────────────
  const placeSticker = (def: StickerDef) => {
    const id = genId()
    setItems(prev => [
      ...prev,
      {
        id,
        type: 'sticker',
        src: def.src,
        alt: def.alt,
        x: 30 + Math.random() * 28,
        y: 25 + Math.random() * 30,
        widthPct: def.defaultWidthPct,
        minPct: def.minPct,
        maxPct: def.maxPct,
      },
    ])
    setActiveCategory(null)
    setSelectedId(id)
  }

  // ── 创建文本框 ────────────────────────────────────────────
  const createText = () => {
    const id = genId()
    setItems(prev => [
      ...prev,
      {
        id,
        type: 'text',
        content: '输入文字',
        color: pickedColor,
        x: 28 + Math.random() * 30,
        y: 28 + Math.random() * 30,
        fontSize: 16,
        editing: true,
      },
    ])
    setEditingId(id)
    setSelectedId(id)
    setActiveCategory(null)
  }

  // ── 文本编辑 ──────────────────────────────────────────────
  const openTextEdit = (id: string) => {
    const found = items.find(i => i.id === id)
    if (found?.type === 'text') setPickedColor(found.color)
    setEditingId(id)
    setSelectedId(id)
    setActiveCategory(null)
    setItems(prev => prev.map(i => (i.id === id && i.type === 'text' ? { ...i, editing: true } : i)))
  }

  const closeTextEdit = (id: string) => {
    setEditingId(null)
    setItems(prev => prev.map(i => (i.id === id && i.type === 'text' ? { ...i, editing: false } : i)))
  }

  const applyColor = (color: string) => {
    setPickedColor(color)
    const target = editingId ?? selectedId
    if (target) {
      setItems(prev =>
        prev.map(i => (i.id === target && i.type === 'text' ? { ...i, color } : i)),
      )
    }
  }

  // ── 删除选中 ──────────────────────────────────────────────
  const deleteSelected = () => {
    if (!selectedId) return
    setItems(prev => prev.filter(i => i.id !== selectedId))
    setSelectedId(null)
    setEditingId(null)
  }

  // ── 调整大小 ──────────────────────────────────────────────
  const resizeSelected = (direction: 1 | -1) => {
    if (!selectedId) return
    setItems(prev =>
      prev.map(item => {
        if (item.id !== selectedId) return item
        if (item.type === 'sticker') {
          const step = 4
          return { ...item, widthPct: Math.max(item.minPct, Math.min(item.maxPct, item.widthPct + direction * step)) }
        }
        if (item.type === 'text') {
          const step = 2
          return { ...item, fontSize: Math.max(10, Math.min(36, item.fontSize + direction * step)) }
        }
        return item
      }),
    )
  }

  // ── 拖拽逻辑（指针事件）────────────────────────────────────
  const onDragStart = (e: React.PointerEvent, item: PlacedItem) => {
    if (item.type === 'text' && item.editing) return
    e.stopPropagation()
    dragMoved.current = false
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = { id: item.id, px: e.clientX, py: e.clientY, ix: item.x, iy: item.y }
  }

  const onDragMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || !postcardRef.current) return
    if (Math.abs(e.clientX - d.px) > 4 || Math.abs(e.clientY - d.py) > 4) {
      dragMoved.current = true
    }
    const { width, height } = postcardRef.current.getBoundingClientRect()
    const nx = Math.max(2, Math.min(96, d.ix + ((e.clientX - d.px) / width) * 100))
    const ny = Math.max(2, Math.min(96, d.iy + ((e.clientY - d.py) / height) * 100))
    setItems(prev => prev.map(i => (i.id === d.id ? { ...i, x: nx, y: ny } : i)))
  }

  const onDragEnd = () => {
    const d = dragRef.current
    // 没有移动则视为点击 → 选中/切换选中
    if (d && !dragMoved.current) {
      setSelectedId(prev => (prev === d.id ? null : d.id))
      setActiveCategory(null)
      setEditingId(null)
      setItems(prev => prev.map(i => (i.type === 'text' && i.editing ? { ...i, editing: false } : i)))
    }
    dragRef.current = null
  }

  // ── 截图保存 ──────────────────────────────────────────────
  const captureAndSave = async () => {
    if (!postcardRef.current || capturing) return
    // 退出所有编辑/选中状态，避免出现在截图中
    setSelectedId(null)
    setEditingId(null)
    setActiveCategory(null)
    setItems(prev => prev.map(i => (i.type === 'text' && i.editing ? { ...i, editing: false } : i)))
    await new Promise<void>(resolve => { requestAnimationFrame(() => { requestAnimationFrame(() => resolve()) }) })

    setCapturing(true)
    try {
      const canvas = await html2canvas(postcardRef.current, {
        scale: window.devicePixelRatio || 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        // 确保只截取 postcard 区域
        width: postcardRef.current.offsetWidth,
        height: postcardRef.current.offsetHeight,
      })
      setPreviewUrl(canvas.toDataURL('image/png'))
    } catch (err) {
      console.error('截图失败:', err)
    } finally {
      setCapturing(false)
    }
  }

  const downloadImage = () => {
    if (!previewUrl) return
    if (typeof navigator.share === 'function') {
      fetch(previewUrl)
        .then(r => r.blob())
        .then(blob => {
          const file = new File([blob], `明信片-${Date.now()}.png`, { type: 'image/png' })
          if (navigator.canShare?.({ files: [file] })) {
            navigator.share({ files: [file], title: '我的厦门明信片' }).catch(fallbackDownload)
            return
          }
          fallbackDownload()
        })
        .catch(fallbackDownload)
    } else {
      fallbackDownload()
    }
  }

  const fallbackDownload = () => {
    if (!previewUrl) return
    const a = document.createElement('a')
    a.href = previewUrl
    a.download = `明信片-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // ── 底部面板模式 ──────────────────────────────────────────
  const selectedItem = items.find(i => i.id === selectedId) ?? null
  type PanelMode = 'color' | 'selection' | 'sticker' | null
  const panelMode: PanelMode = (() => {
    if (editingId) return 'color'
    if (selectedId) return 'selection'
    if (activeCategory) return 'sticker'
    return null
  })()

  // ─────────────────────────────────────────────────────────
  return (
    <section
      id="home-page-8"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page8} />

      {/* 主容器 — 与其他页面保持相同的圆角卡片格式 */}
      <div className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-sm overflow-hidden rounded-[34px] bg-white shadow-[0_24px_60px_rgba(112,130,186,0.18)] flex flex-col">

        {/* 背景图铺满卡片 */}
        <SceneImage
          asset={page8Assets.background}
          className="absolute inset-0 h-full w-full object-fill z-0"
        />

        {/* ── 明信片画布（上方，flex-1）── */}
        <div
          ref={postcardRef}
          className="relative mx-[4%] mt-[4%] flex-1 min-h-0  overflow-hidden  z-10"
          onClick={() => {
            if (editingId) closeTextEdit(editingId)
            setSelectedId(null)
            setActiveCategory(null)
          }}
        >
          {/* 明信片背景 */}
          <img
            src={page8Assets.postcardBg.src}
            alt={page8Assets.postcardBg.alt}
            className="absolute w-full top-40  object-fill"
            crossOrigin="anonymous"
            draggable={false}
          />

          {/* 放置的贴纸和文字 */}
          {items.map(item => {
            const isSelected = selectedId === item.id

            if (item.type === 'sticker') {
              return (
                <div
                  key={item.id}
                  className="absolute touch-none select-none"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    width: `${item.widthPct}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 30 : 10,
                    cursor: 'grab',
                    outline: isSelected ? '2.5px solid #f472b6' : 'none',
                    outlineOffset: '3px',
                    borderRadius: '6px',
                  }}
                  onPointerDown={e => onDragStart(e, item)}
                  onPointerMove={onDragMove}
                  onPointerUp={onDragEnd}
                  onPointerCancel={onDragEnd}
                  onClick={e => e.stopPropagation()}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto pointer-events-none rounded-sm"
                    style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))' }}
                    draggable={false}
                    crossOrigin="anonymous"
                  />
                </div>
              )
            }

            if (item.type === 'text') {
              return (
                <div
                  key={item.id}
                  className="absolute touch-none select-none"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 30 : 20,
                    cursor: item.editing ? 'text' : 'grab',
                    outline: isSelected && !item.editing ? '2px dashed #f472b6' : 'none',
                    outlineOffset: '4px',
                    borderRadius: '4px',
                  }}
                  onPointerDown={e => onDragStart(e, item)}
                  onPointerMove={onDragMove}
                  onPointerUp={onDragEnd}
                  onPointerCancel={onDragEnd}
                  onClick={e => e.stopPropagation()}
                >
                  {item.editing ? (
                    <input
                      autoFocus
                      type="text"
                      value={item.content}
                      onChange={e =>
                        setItems(prev =>
                          prev.map(i =>
                            i.id === item.id && i.type === 'text'
                              ? { ...i, content: e.target.value }
                              : i,
                          ),
                        )
                      }
                      onBlur={() => closeTextEdit(item.id)}
                      onClick={e => e.stopPropagation()}
                      onPointerDown={e => e.stopPropagation()}
                      className="bg-transparent border-b-2 border-current outline-none font-semibold min-w-[64px] max-w-[170px] px-1 text-center"
                      style={{ color: item.color, fontSize: `${item.fontSize}px` }}
                    />
                  ) : (
                    <span
                      className="font-semibold whitespace-nowrap px-1"
                      style={{
                        color: item.color,
                        fontSize: `${item.fontSize}px`,
                        textShadow: '0 1px 3px rgba(255,255,255,0.8)',
                      }}
                    >
                      {item.content}
                    </span>
                  )}
                </div>
              )
            }

            return null
          })}

          {/* ── 浮层操作栏：选中贴纸/文字时直接悬浮在其上方 ── */}
          {selectedItem && !editingId && (
            <div
              className="absolute z-40 flex items-center gap-1 bg-white/95 rounded-full shadow-[0_2px_14px_rgba(0,0,0,0.18)] px-1.5 py-1"
              style={{
                left: `${selectedItem.x}%`,
                top: `${selectedItem.y}%`,
                transform: 'translate(-50%, calc(-50% - 46px))',
              }}
              onPointerDown={e => e.stopPropagation()}
              onClick={e => e.stopPropagation()}
            >
              {/* 缩小 */}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200 active:scale-95 transition-all font-bold text-base"
                onClick={() => resizeSelected(-1)}
              >
                −
              </button>
              {/* 放大 */}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200 active:scale-95 transition-all font-bold text-base"
                onClick={() => resizeSelected(1)}
              >
                ＋
              </button>
              {/* 编辑文字（仅文字类型）*/}
              {selectedItem.type === 'text' && (
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center active:bg-sky-100 active:scale-95 transition-all text-sm"
                  onClick={() => openTextEdit(selectedItem.id)}
                >
                  ✏️
                </button>
              )}
              {/* 分隔线 */}
              <div className="w-px h-4 bg-gray-200 mx-0.5" />
              {/* 删除 */}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 active:bg-red-100 active:scale-95 transition-all text-sm"
                onClick={deleteSelected}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* ── 底部操作区（下方，固定高度）── */}
        <div className="shrink-0 flex flex-col pb-30 z-10 relative">



          {/* ── 动态面板区域 ── */}
          {panelMode !== null && (
            <div className="border-t border-[#f0d8d0]/50">

              {/* 颜色选择器（文字编辑中）*/}
              {panelMode === 'color' && (
                <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto" style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">字色</span>
                  {TEXT_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`w-7 h-7 rounded-full shrink-0 transition-transform active:scale-90 ${pickedColor === c ? 'scale-125' : ''}`}
                      style={{
                        backgroundColor: c,
                        border: pickedColor === c ? '2.5px solid #374151' : '2px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                      }}
                      onClick={() => applyColor(c)}
                    />
                  ))}
                </div>
              )}

              {/* 选中文字时：底部显示颜色选择器 */}
              {panelMode === 'selection' && selectedItem?.type === 'text' && (
                <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto" style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">字色</span>
                  {TEXT_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`w-7 h-7 rounded-full shrink-0 transition-transform active:scale-90 ${selectedItem.color === c ? 'scale-125' : ''}`}
                      style={{
                        backgroundColor: c,
                        border: selectedItem.color === c ? '2.5px solid #374151' : '2px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                      }}
                      onClick={() => applyColor(c)}
                    />
                  ))}
                </div>
              )}

              {/* 贴纸选择器 */}
              {panelMode === 'sticker' && (
                <div className="flex gap-2.5 px-4 py-2.5 overflow-x-auto" style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                  {CATEGORIES.find(c => c.id === activeCategory)?.stickers.map(s => (
                    <button
                      key={s.key}
                      type="button"
                      className="shrink-0 w-14 h-14 rounded-xl bg-[#fdf5f2] border border-[#f0d8d0]/60 flex items-center justify-center active:scale-95 transition-transform shadow-sm"
                      onClick={() => placeSticker(s)}
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        className="w-10 h-10 object-cover rounded-lg"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4 个分类工具按钮 */}
          <div className="flex items-center justify-around px-4 pt-1 pb-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all active:scale-95 ${
                  activeCategory === cat.id ? 'bg-[#fde8e0]' : ''
                }`}
                onClick={() => {
                  // 关闭其他模式，切换分类
                  if (editingId) {
                    setEditingId(null)
                    setItems(prev => prev.map(i => (i.type === 'text' && i.editing ? { ...i, editing: false } : i)))
                  }
                  setSelectedId(null)
                  setActiveCategory(prev => (prev === cat.id ? null : cat.id))
                }}
              >
                <span className="text-xl leading-none">{cat.icon}</span>
                <span className="text-[10px] text-gray-600 font-medium mt-0.5">{cat.label}</span>
              </button>
            ))}

            <button
              type="button"
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all active:scale-95"
              onClick={createText}
            >
              <span className="text-xl leading-none">✏️</span>
              <span className="text-[10px] text-gray-600 font-medium mt-0.5">文字</span>
            </button>
          </div>
          {/* 完成按钮 ── 在所有面板的上方 */}
          <div className="px-5 pt-10 pb-1.5">
            <button
              type="button"
              disabled={capturing}
              onClick={captureAndSave}
              className="w-full flex items-center justify-center active:scale-[0.97] transition-transform disabled:opacity-60"
            >
              <img
                src={page8Assets.completeButton.src}
                alt="制作完成"
                className=" h-auto w-50"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── 截图预览弹窗 ── */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-6"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img src={previewUrl} alt="明信片预览" className="w-full h-auto block" />
            <div className="flex gap-3 p-4">
              <button
                type="button"
                className="grow py-3 rounded-2xl bg-rose-400 text-white text-sm font-semibold active:scale-95 transition-transform shadow-sm"
                onClick={downloadImage}
              >
                保存到相册
              </button>
              <button
                type="button"
                className="grow py-3 rounded-2xl bg-gray-100 text-gray-600 text-sm font-semibold active:scale-95 transition-transform"
                onClick={() => setPreviewUrl(null)}
              >
                继续编辑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 截图 loading ── */}
      {capturing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
          <div className="bg-white rounded-2xl px-8 py-5 flex items-center gap-3 shadow-xl">
            <span className="text-2xl animate-spin inline-block">✦</span>
            <span className="text-sm text-gray-600 font-medium">正在生成明信片…</span>
          </div>
        </div>
      )}

      <ScrollHint />
    </section>
  )
}
