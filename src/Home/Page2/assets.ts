import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page2/background.png'
import photoOne from '../../../assets/page2/photo-1.png'
import photoTwo from '../../../assets/page2/photo-2.png'
import photoThree from '../../../assets/page2/photo-3.png'
import textImage from '../../../assets/page2/text.png'

export const page2Assets = {
  background: {
    src: backgroundImage,
    alt: '第二页背景',
    group: 'page',
  },
  text: {
    src: textImage,
    alt: '第二页文案',
    group: 'page',
  },
  photoOne: {
    src: photoOne,
    alt: '第二页照片一',
    group: 'page',
  },
  photoTwo: {
    src: photoTwo,
    alt: '第二页照片二',
    group: 'page',
  },
  photoThree: {
    src: photoThree,
    alt: '第二页照片三',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
