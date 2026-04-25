export const coreAudioSrcs = {
  bg: `${import.meta.env.BASE_URL}audio/bg.mp3`,
  click: `${import.meta.env.BASE_URL}audio/click.mp3`,
  finish: `${import.meta.env.BASE_URL}audio/finish.mp3`,
} as const

export const requiredAudioSrcs = Object.values(coreAudioSrcs)
