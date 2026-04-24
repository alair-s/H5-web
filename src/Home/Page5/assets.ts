import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page5/background.png'
import characterOneImage from '../../../assets/page5/character-1.png'
import textImage from '../../../assets/page5/text.png'
import characterTwoImage from '../../../assets/page5/character-2.png'
import bgflowerImage from '../../../assets/page5/flowers.jpg'
export const page5Assets = {
  background: {
    src: backgroundImage,
    alt: '第五页背景',
    group: 'page',
  },
  text: {
    src: textImage,
    alt: '第五页文案',
    group: 'page',
  },
  characterOne: {
    src: characterOneImage,
    alt: '第五页人物',
    group: 'page',
  },
  characterTwo: {
    src: characterTwoImage,
    alt: '第五页人物',
    group: 'page',
  },
  bgflower: {
    src: bgflowerImage,
    alt: '第五页背景花瓣',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
