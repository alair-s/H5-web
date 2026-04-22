export type MusicTrack = {
  id: string
  title: string
  src?: string
}

export const pageMusicTracks = {
  page1: {
    id: 'page1-bgm',
    title: 'Page 1 BGM',
    src: '/audio/page1-bgm.mp3',
  },
  page2: {
    id: 'page2-bgm',
    title: 'Page 2 BGM',
    src: '/audio/page2-bgm.mp3',
  },
  page3: {
    id: 'page3-bgm',
    title: 'Page 3 BGM',
    src: '/audio/page3-bgm.mp3',
  },
  page4: {
    id: 'page4-bgm',
    title: 'Page 4 BGM',
    src: '/audio/page4-bgm.mp3',
  },
  page5: {
    id: 'page5-bgm',
    title: 'Page 5 BGM',
    src: '/audio/page5-bgm.mp3',
  },
  page6: {
    id: 'page6-bgm',
    title: 'Page 6 BGM',
    src: '/audio/page6-bgm.mp3',
  },
} satisfies Record<string, MusicTrack>
