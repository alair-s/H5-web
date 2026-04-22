import type { PngAsset } from '../../Background/assets'
import afterEraseImage from '../../../assets/page4/after-erase.png'
import backgroundImage from '../../../assets/page4/background.png'
import beforeEraseImage from '../../../assets/page4/before-erase.png'
import textImage from '../../../assets/page4/text.png'

export const page4Assets = {
  background: {
    src: backgroundImage,
    alt: '第四页背景',
    group: 'page',
  },
  text: {
    src: textImage,
    alt: '第四页文案',
    group: 'page',
  },
  beforeErase: {
    src: beforeEraseImage,
    alt: '擦除前画面',
    group: 'page',
  },
  afterErase: {
    src: afterEraseImage,
    alt: '擦除后画面',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
