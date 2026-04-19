import bgImage from '../../assets/page1/background.png'
import bubbleImage from '../../assets/page1/dialog-bubble.png'
import buttonImage from '../../assets/page1/start-button.png'
import characterImage from '../../assets/page1/character.png'
import subtitleImage from '../../assets/page1/subtitle.png'
import titleImage from '../../assets/page1/title.png'

export type PngAsset = {
  src: string
  alt: string
  group: 'shared' | 'page'
  preload?: boolean
}

export const sharedPngAssets = {
  page1Background: {
    src: bgImage,
    alt: '厦门明信片背景',
    group: 'shared',
    preload: true,
  },
  page1Title: {
    src: titleImage,
    alt: '寄出一份甜 遇见厦门',
    group: 'page',
    preload: true,
  },
  page1Subtitle: {
    src: subtitleImage,
    alt: '副标题装饰条',
    group: 'page',
  },
  page1Character: {
    src: characterImage,
    alt: '主视觉人物',
    group: 'page',
    preload: true,
  },
  page1Bubble: {
    src: bubbleImage,
    alt: '和我一起出发吧',
    group: 'page',
  },
  page1Button: {
    src: buttonImage,
    alt: '开启甜蜜之旅',
    group: 'page',
  },
} satisfies Record<string, PngAsset>

export const creativeKeywords = [
  '邮票印章',
  '海风流线',
  '纸片翻页',
  '漂浮光斑',
  '云朵描边',
  '贝壳闪片',
] as const
