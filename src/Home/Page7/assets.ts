import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page7/background.png'
import characterImage from '../../../assets/page7/character.png'
import titleImage from '../../../assets/page7/title.png'
import buttonImage from '../../../assets/page7/button.png'

export const page7Assets = {
  background: {
    src: backgroundImage,
    alt: '第七页背景',
    group: 'page',
  },
  title: {
    src: titleImage,
    alt: '明信片创作环节标题',
    group: 'page',
  },
  character: {
    src: characterImage,
    alt: '第七页人物',
    group: 'page',
  },
  button: {
    src: buttonImage,
    alt: '第七页按钮',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
