import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page8/background.png'
import postcardBgImage from '../../../assets/page8/明信片.png'
import bougainvilleaImage from '../../../assets/page8/bougainvillea.png'
import candyImage from '../../../assets/page8/candy.png'
import completeButtonImage from '../../../assets/page8/complete-button.png'
import conchImage from '../../../assets/page8/conch.png'
import crabImage from '../../../assets/page8/crab.png'
import emojiImage from '../../../assets/page8/emoji.png'
import emoji5Image from '../../../assets/page8/表情包5.png'
import emoji6Image from '../../../assets/page8/表情包6.png'
import emoji7Image from '../../../assets/page8/表情包7.png'
import emoji8Image from '../../../assets/page8/表情包8.png'
import emoji9Image from '../../../assets/page8/表情包9.png'
import palmTreeImage from '../../../assets/page8/palm-tree.png'
import seagullImage from '../../../assets/page8/seagull.png'
import shellOneImage from '../../../assets/page8/shell-1.png'
import shellTwoImage from '../../../assets/page8/shell-2.png'
import starImage from '../../../assets/page8/star.png'
import waveImage from '../../../assets/page8/wave.png'
import xmu2Image from '../../../assets/page8/厦门大学2.jpg'
import twinTowersImage from '../../../assets/page8/双子塔.avif'
import shaPoWeiImage from '../../../assets/page8/沙坡尾.jpg'
import jiMei1Image from '../../../assets/page8/集美学村.jpg'
import jiMei2Image from '../../../assets/page8/集美学村2.jpg'
import jiMei3Image from '../../../assets/page8/集美学村3.jpg'

export const page8Assets = {
  background: { src: backgroundImage, alt: '页面背景', group: 'page' },
  postcardBg: { src: postcardBgImage, alt: '明信片背景', group: 'page' },
  completeButton: { src: completeButtonImage, alt: '制作完成按钮', group: 'page' },
  // 表情包贴纸
  emoji: { src: emojiImage, alt: '表情贴纸', group: 'page' },
  emoji5: { src: emoji5Image, alt: '可爱表情5', group: 'page' },
  emoji6: { src: emoji6Image, alt: '可爱表情6', group: 'page' },
  emoji7: { src: emoji7Image, alt: '可爱表情7', group: 'page' },
  emoji8: { src: emoji8Image, alt: '可爱表情8', group: 'page' },
  emoji9: { src: emoji9Image, alt: '可爱表情9', group: 'page' },
  // 物品贴纸
  bougainvillea: { src: bougainvilleaImage, alt: '三角梅', group: 'page' },
  candy: { src: candyImage, alt: '糖果', group: 'page' },
  conch: { src: conchImage, alt: '海螺', group: 'page' },
  crab: { src: crabImage, alt: '螃蟹', group: 'page' },
  palmTree: { src: palmTreeImage, alt: '椰树', group: 'page' },
  seagull: { src: seagullImage, alt: '海鸥', group: 'page' },
  shellOne: { src: shellOneImage, alt: '贝壳一', group: 'page' },
  shellTwo: { src: shellTwoImage, alt: '贝壳二', group: 'page' },
  star: { src: starImage, alt: '星星', group: 'page' },
  wave: { src: waveImage, alt: '海浪', group: 'page' },
  // 风景照片
  xmu2: { src: xmu2Image, alt: '厦门大学', group: 'page' },
  twinTowers: { src: twinTowersImage, alt: '双子塔', group: 'page' },
  shaPoWei: { src: shaPoWeiImage, alt: '沙坡尾', group: 'page' },
  jiMei1: { src: jiMei1Image, alt: '集美学村', group: 'page' },
  jiMei2: { src: jiMei2Image, alt: '集美学村2', group: 'page' },
  jiMei3: { src: jiMei3Image, alt: '集美学村3', group: 'page' },
} satisfies Record<string, PngAsset>
