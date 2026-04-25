import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page11/background.jpg'
import characterImage from '../../../assets/page11/character.png'
import displayBoardImage from '../../../assets/page11/display-board.png'
import textImage from '../../../assets/page11/text.png'

export const page11Assets = {
  background: {
    src: backgroundImage,
    alt: '第十一页背景',
    group: 'page',
  },
  character: {
    src: characterImage,
    alt: '第十一页人物',
    group: 'page',
  },
  displayBoard: {
    src: displayBoardImage,
    alt: '展示栏',
    group: 'page',
  },
  text: {
    src: textImage,
    alt: '第十一页文案',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
