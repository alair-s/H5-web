import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page6/background.png'
import successEmoji from '../../../assets/page6/success-emoji.png'
import titleImage from '../../../assets/page6/title.png'
import piece1 from '../../../assets/page6/拼图页（5)/1.jpg'
import piece2 from '../../../assets/page6/拼图页（5)/2.jpg'
import piece3 from '../../../assets/page6/拼图页（5)/3.jpg'
import piece4 from '../../../assets/page6/拼图页（5)/4.jpg'
import piece5 from '../../../assets/page6/拼图页（5)/5.jpg'
import piece6 from '../../../assets/page6/拼图页（5)/6.jpg'
import piece7 from '../../../assets/page6/拼图页（5)/7.jpg'
import piece8 from '../../../assets/page6/拼图页（5)/8.jpg'
import piece9 from '../../../assets/page6/拼图页（5)/9.jpg'

export const page6Assets = {
  background: {
    src: backgroundImage,
    alt: '第六页背景',
    group: 'page',
  },
  title: {
    src: titleImage,
    alt: '砖花·拼图小游戏',
    group: 'page',
  },
  successEmoji: {
    src: successEmoji,
    alt: '完成',
    group: 'page',
  },
  pieces: [
    { src: piece1, alt: '拼图碎片1', group: 'page' },
    { src: piece2, alt: '拼图碎片2', group: 'page' },
    { src: piece3, alt: '拼图碎片3', group: 'page' },
    { src: piece4, alt: '拼图碎片4', group: 'page' },
    { src: piece5, alt: '拼图碎片5', group: 'page' },
    { src: piece6, alt: '拼图碎片6', group: 'page' },
    { src: piece7, alt: '拼图碎片7', group: 'page' },
    { src: piece8, alt: '拼图碎片8', group: 'page' },
    { src: piece9, alt: '拼图碎片9', group: 'page' },
  ] satisfies PngAsset[],
} satisfies {
  background: PngAsset
  title: PngAsset
  successEmoji: PngAsset
  pieces: PngAsset[]
}
