import type { PngAsset } from '../../Background/assets'
import backgroundImage from '../../../assets/page10/background.png'
import characterOneImage from '../../../assets/page10/character-1.png'
import characterTwoImage from '../../../assets/page10/character-2.png'
import dialogBubbleOneImage from '../../../assets/page10/dialog-bubble-1.png'
import dialogBubbleTwoImage from '../../../assets/page10/dialog-bubble-2.png'
import envelopeImage from '../../../assets/page10/envelope.png'
import mailboxImage from '../../../assets/page10/mailbox.png'
import textOneImage from '../../../assets/page10/text-1.png'
import textTwoImage from '../../../assets/page10/text-2.png'

export const page10Assets = {
  background: {
    src: backgroundImage,
    alt: '第十页背景',
    group: 'page',
  },
  characterOne: {
    src: characterOneImage,
    alt: '第十页人物一',
    group: 'page',
  },
  characterTwo: {
    src: characterTwoImage,
    alt: '第十页人物二',
    group: 'page',
  },
  dialogBubbleOne: {
    src: dialogBubbleOneImage,
    alt: '第十页对话框一',
    group: 'page',
  },
  dialogBubbleTwo: {
    src: dialogBubbleTwoImage,
    alt: '第十页对话框二',
    group: 'page',
  },
  envelope: {
    src: envelopeImage,
    alt: '信封',
    group: 'page',
  },
  mailbox: {
    src: mailboxImage,
    alt: '邮筒',
    group: 'page',
  },
  textOne: {
    src: textOneImage,
    alt: '第十页文案一',
    group: 'page',
  },
  textTwo: {
    src: textTwoImage,
    alt: '第十页文案二',
    group: 'page',
  },
} satisfies Record<string, PngAsset>
