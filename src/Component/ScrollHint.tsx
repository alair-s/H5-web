import { motion } from 'motion/react'

export default function ScrollHint() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2 text-[11px] tracking-[0.3em] text-slate-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
    >
      <span>下一页</span>
      <div className="flex h-10 w-6 justify-center rounded-full border border-slate-400/60">
        <motion.span
          className="mt-2 h-2 w-2 rounded-full bg-slate-500"
          animate={{ y: [0, 10, 0], opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
