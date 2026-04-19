import bgImage from '../../第一页/背景.png'
import bubbleImage from '../../第一页/对话框.png'
import buttonImage from '../../第一页/开始按钮.png'
import characterImage from '../../第一页/第一页.png'
import subtitleImage from '../../第一页/副标题.png'
import titleImage from '../../第一页/标题.png'

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
