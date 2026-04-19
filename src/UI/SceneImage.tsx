import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import type { PngAsset } from '../Background/assets'

type SceneImageProps = Omit<ComponentProps<typeof motion.img>, 'src' | 'alt'> & {
  asset: PngAsset
}

export default function SceneImage({ asset, ...props }: SceneImageProps) {
  return (
    <motion.img
      src={asset.src}
      alt={asset.alt}
      loading={asset.preload ? 'eager' : 'lazy'}
      decoding="async"
      {...(asset.preload ? { fetchPriority: 'high' as const } : {})}
      {...props}
    />
  )
}
