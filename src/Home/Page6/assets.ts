import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page6/background.png'
import successEmojiImage from '../../../assets/page6/success-emoji.png'
import titleImage from '../../../assets/page6/title.png'
import completedPuzzleImage from '../../../assets/page6/puzzle/completed-puzzle.png'
import piece1 from '../../../assets/page6/puzzle/piece-1.png'
import piece2 from '../../../assets/page6/puzzle/piece-2.png'
import piece3 from '../../../assets/page6/puzzle/piece-3.png'
import piece4 from '../../../assets/page6/puzzle/piece-4.png'
import piece5 from '../../../assets/page6/puzzle/piece-5.png'
import piece6 from '../../../assets/page6/puzzle/piece-6.png'
import piece7 from '../../../assets/page6/puzzle/piece-7.png'
import piece8 from '../../../assets/page6/puzzle/piece-8.png'
import piece9 from '../../../assets/page6/puzzle/piece-9.png'

export const page6Assets = {
  background: {
    src: backgroundImage,
    alt: '第六页背景',
    group: 'page',
  },
  title: {
    src: titleImage,
    alt: '第六页标题',
    group: 'page',
  },
  successEmoji: {
    src: successEmojiImage,
    alt: '拼图成功表情',
    group: 'page',
  },
  completedPuzzle: {
    src: completedPuzzleImage,
    alt: '完整拼图',
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
  completedPuzzle: PngAsset
  pieces: PngAsset[]
}
