import { coreAudioSrcs } from './audioAssets'

export type MusicTrack = {
  id: string
  title: string
  src?: string
}

export const bgTrack: MusicTrack = {
  id: 'bg',
  title: '背景音乐',
  src: coreAudioSrcs.bg,
}

export const pageMusicTracks = {
  page1: {
    id: 'page1-bgm',
    title: 'Page 1 BGM',
    src: `${import.meta.env.BASE_URL}audio/page1-bgm.mp3`,
  },
  page2: {
    id: 'page2-bgm',
    title: 'Page 2 BGM',
    src: `${import.meta.env.BASE_URL}audio/page2-bgm.mp3`,
  },
  page3: {
    id: 'page3-bgm',
    title: 'Page 3 BGM',
    src: `${import.meta.env.BASE_URL}audio/page3-bgm.mp3`,
  },
  page4: {
    id: 'page4-bgm',
    title: 'Page 4 BGM',
    src: `${import.meta.env.BASE_URL}audio/page4-bgm.mp3`,
  },
  page5: {
    id: 'page5-bgm',
    title: 'Page 5 BGM',
    src: `${import.meta.env.BASE_URL}audio/page5-bgm.mp3`,
  },
  page6: {
    id: 'page6-bgm',
    title: 'Page 6 BGM',
    src: `${import.meta.env.BASE_URL}audio/page6-bgm.mp3`,
  },
  page7: {
    id: 'page7-bgm',
    title: 'Page 7 BGM',
    src: `${import.meta.env.BASE_URL}audio/page7-bgm.mp3`,
  },
  page8: {
    id: 'page8-bgm',
    title: 'Page 8 BGM',
    src: `${import.meta.env.BASE_URL}audio/page8-bgm.mp3`,
  },
  page9: {
    id: 'page9-bgm',
    title: 'Page 9 BGM',
    src: `${import.meta.env.BASE_URL}audio/page9-bgm.mp3`,
  },
  page10: {
    id: 'page10-bgm',
    title: 'Page 10 BGM',
    src: `${import.meta.env.BASE_URL}audio/page10-bgm.mp3`,
  },
  page11: {
    id: 'page11-bgm',
    title: 'Page 11 BGM',
    src: `${import.meta.env.BASE_URL}audio/page11-bgm.mp3`,
  },
} satisfies Record<string, MusicTrack>
