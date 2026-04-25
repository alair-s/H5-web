import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page12/bg.png'

export const page12Assets = {
  background: {
    src: backgroundImage,
    alt: '第十二页背景',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
