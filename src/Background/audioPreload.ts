const preloadedAudioSrcs = new Map<string, string>()
const preloadPromises = new Map<string, Promise<string>>()

export function resolvePreloadedAudioSrc(src: string) {
  return preloadedAudioSrcs.get(src) ?? src
}

export function preloadAudioFile(src: string) {
  const preloadedSrc = preloadedAudioSrcs.get(src)

  if (preloadedSrc) {
    return Promise.resolve(preloadedSrc)
  }

  const existingPromise = preloadPromises.get(src)

  if (existingPromise) {
    return existingPromise
  }

  const promise = fetch(src, { cache: 'force-cache' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to preload audio: ${src}`)
      }

      return response.blob()
    })
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob)
      const current = preloadedAudioSrcs.get(src)

      if (current) {
        URL.revokeObjectURL(objectUrl)
        return current
      }

      preloadedAudioSrcs.set(src, objectUrl)
      return objectUrl
    })
    .finally(() => {
      preloadPromises.delete(src)
    })

  preloadPromises.set(src, promise)
  return promise
}
