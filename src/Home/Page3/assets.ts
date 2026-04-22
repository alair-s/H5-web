import type { PngAsset } from '../../Background/assets'
import alleyImage from '../../../assets/page3/alley.png'
import backgroundImage from '../../../assets/page3/background.jpg'
import bungalowImage from '../../../assets/page3/bungalow.png'
import bubbleImage from '../../../assets/page3/dialog-bubble.png'
import ipImage from '../../../assets/page3/ip.png'
import twinTowersImage from '../../../assets/page3/twin-towers.png'
import zhongshanRoadImage from '../../../assets/page3/zhongshan-road.png'

export const page3Assets = {
  background: {
    src: backgroundImage,
    alt: '第三页背景',
    group: 'page',
  },
  ip: {
    src: ipImage,
    alt: '第三页形象',
    group: 'page',
  },
  bubble: {
    src: bubbleImage,
    alt: '第三页对话框',
    group: 'page',
  },
  twinTowers: {
    src: twinTowersImage,
    alt: '双子塔',
    group: 'page',
  },
  alley: {
    src: alleyImage,
    alt: '鼓浪屿小巷',
    group: 'page',
  },
  zhongshanRoad: {
    src: zhongshanRoadImage,
    alt: '中山路',
    group: 'page',
  },
  bungalow: {
    src: bungalowImage,
    alt: '南洋小屋',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
