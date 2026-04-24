import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page9/background.png'
import dialogBubbleImage from '../../../assets/page9/dialog-bubble.png'
import girlImage from '../../../assets/page9/girl.png'
import postmarkImage from '../../../assets/page9/postmark.png'
import stampImage from '../../../assets/page9/stamp.png'

export const page9Assets = {
  background: {
    src: backgroundImage,
    alt: '第九页背景',
    group: 'page',
  },
  dialogBubble: {
    src: dialogBubbleImage,
    alt: '第九页对话框',
    group: 'page',
  },
  girl: {
    src: girlImage,
    alt: '第九页人物',
    group: 'page',
  },
  postmark: {
    src: postmarkImage,
    alt: '邮戳图案',
    group: 'page',
  },
  stamp: {
    src: stampImage,
    alt: '印章',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
