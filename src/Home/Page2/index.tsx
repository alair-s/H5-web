import { motion } from 'motion/react'
import { creativeKeywords } from '../../Background/assets'
import { pageMusicTracks } from '../../Background/music'
import PageMusic from '../../Component/PageMusic'
import type { HomePageProps } from '../types'

const featureCards = [
  {
    title: 'PNG 企业级管理',
    desc: '公共素材统一注册，页面只拿配置，不在业务组件里到处散落 import。',
  },
  {
    title: '纯滚动分页',
    desc: '不要导航栏，直接利用手机长屏和滚动节奏完成内容叙事。',
  },
  {
    title: '页面内再分页',
    desc: 'Home 负责总滚动，Page 内部再拆版心、装饰层和内容层，后面继续扩展更稳。',
  },
]

const motionIdeas = [
  '海风流线：用细白线和透明渐变做横向掠过，表现海边风感。',
  '邮票盖章：在章节切换处加入旋转落章，增强“明信片”主题。',
  '纸片揭示：内容卡片滚动到可视区域时像便签被轻轻揭开。',
  '光斑漂浮：少量淡蓝高光上下浮动，替代继续堆 PNG。',
]

const routeStops = ['鼓浪屿', '中山路', '沙坡尾', '环岛路']

export default function Page2({ activePageId }: HomePageProps) {
  const isActive = activePageId === 'home-page-2'

  return (
    <section
      id="home-page-2"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-4"
    >
      <PageMusic isActive={isActive} track={pageMusicTracks.page2} />
      <div className="relative mx-auto flex h-[calc(100vh-2rem)] w-full max-w-sm flex-col overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#fefeff,#edf3ff_62%,#dbe7ff)] px-5 py-8 shadow-[0_24px_60px_rgba(112,130,186,0.2)]">
        <div className="absolute -right-10 top-10 h-36 w-36 rounded-full bg-[#bdd1ff]/40 blur-3xl" />
        <div className="absolute -left-12 bottom-28 h-40 w-40 rounded-full bg-[#ffe8b8]/55 blur-3xl" />

        <motion.div
          className="absolute right-4 top-4 h-24 w-24 rounded-full border-2 border-dashed border-[#8ea8f4]/70"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#6f8ee8]">
            Home / Page 02
          </p>
          <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-slate-800">
            一屏负责氛围
            <br />
            二屏负责展开故事
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            这里不再继续堆整张 PNG，而是用卡片、印章、流线和浮层把内容带出来，
            这样后面的 H5 会更轻，也更像完整作品。
          </p>
        </motion.div>

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
          {creativeKeywords.map((word, index) => (
            <motion.div
              key={word}
              className="rounded-2xl border border-white/80 bg-white/70 px-3 py-3 text-center text-sm font-medium text-slate-700 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mt-5 space-y-3">
          {featureCards.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-[26px] bg-white/72 p-4 shadow-[0_14px_34px_rgba(125,146,194,0.12)] backdrop-blur-md"
              initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <p className="text-base font-semibold text-slate-800">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="relative z-10 mt-5 rounded-[30px] bg-[linear-gradient(135deg,rgba(111,142,232,0.94),rgba(136,181,255,0.92))] p-5 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Creative Route
              </p>
              <p className="mt-2 text-lg font-semibold">创意动效方向</p>
            </div>
            <motion.div
              className="h-12 w-12 rounded-full bg-white/14"
              animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="mt-4 space-y-2 text-sm leading-6 text-white/92">
            {motionIdeas.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 mt-auto flex flex-wrap gap-2">
          {routeStops.map((stop, index) => (
            <motion.span
              key={stop}
              className="rounded-full border border-white/70 bg-white/70 px-3 py-2 text-xs text-slate-700"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              {stop}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
