/**
 * 明信片数据存储
 * 使用 localStorage 保存用户制作的明信片，以时间戳命名
 */

const STORAGE_KEY = 'xiamen-postcard-records'

export interface PostcardRecord {
  /** Unix 时间戳（毫秒）*/
  timestamp: number
  /** 文件名，如 "明信片-1714023600000.png" */
  name: string
  /** base64 data URL */
  dataUrl: string
}

/** 保存明信片到 localStorage，返回保存的记录 */
export function savePostcard(dataUrl: string): PostcardRecord {
  const timestamp = Date.now()
  const record: PostcardRecord = {
    timestamp,
    name: `明信片-${timestamp}.png`,
    dataUrl,
  }

  try {
    const existing = loadAllPostcards()
    existing.push(record)
    // 最多保留最新的 5 张，避免超出存储配额
    const toSave = existing.slice(-5)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // 存储配额溢出时仅保留最新一张
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([record]))
    } catch {
      // 忽略
    }
  }

  return record
}

/** 读取所有已保存的明信片（按时间升序）*/
export function loadAllPostcards(): PostcardRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as PostcardRecord[]
  } catch {
    return []
  }
}

/** 读取最新一张明信片，没有则返回 null */
export function loadLatestPostcard(): PostcardRecord | null {
  const all = loadAllPostcards()
  return all.length > 0 ? all[all.length - 1] : null
}

/** 用新的 dataUrl 替换最新一张明信片的图像内容（盖章后调用）*/
export function updateLatestPostcard(newDataUrl: string): void {
  try {
    const records = loadAllPostcards()
    if (records.length === 0) return
    records[records.length - 1] = {
      ...records[records.length - 1],
      dataUrl: newDataUrl,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch {
    // 忽略写入失败
  }
}
