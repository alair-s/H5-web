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
} satisfies Record<string, MusicTrack>
