import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// 生成一个getClientId的方法 首先去Local Storage中查寻是否有client_id字段 如果有则返回对应的值 如果没有则生成一个新的client_id并存储到Local Storage中再返回
export function getClientId() {
  let clientId = localStorage.getItem('client_id')
  if (!clientId) {
    clientId = uuidv4()
    localStorage.setItem('client_id', clientId)
  }
  return clientId
}
//生成一个hasClientId的方法 用于判断是否有client_id字段 如果有则返回true 否则返回false
export function hasClientId() {
  return localStorage.getItem('client_id') !== null
}

// 生成一个getUtmParams的方法 从当前URL中提取utm_source、utm_medium、utm_campaign参数并返回一个对象
export function getUtmParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const utmSource = urlParams.get('utm_source')
  const utmMedium = urlParams.get('utm_medium')
  const utmCampaign = urlParams.get('utm_campaign')

  if (hasClientId()) {
    //从Local Storage中获取first_touch_utm_source、first_touch_utm_medium、first_touch_utm_campaign字段 如果有则返回对应的值 如果没有则返回空字符串
    const firstTouchUtmSource =
      localStorage.getItem('first_touch_utm_source') || ''
    const firstTouchUtmMedium =
      localStorage.getItem('first_touch_utm_medium') || ''
    const firstTouchUtmCampaign =
      localStorage.getItem('first_touch_utm_campaign') || ''
    return {
      first_touch_utm_source: firstTouchUtmSource || '',
      first_touch_utm_medium: firstTouchUtmMedium || '',
      first_touch_utm_campaign: firstTouchUtmCampaign || '',
      last_touch_utm_source: utmSource || '',
      last_touch_utm_medium: utmMedium || '',
      last_touch_utm_campaign: utmCampaign || '',
    }
  }
  //如果没有client_id字段 则将当前的utm_source、utm_medium、utm_campaign写入Local Storage中
  localStorage.setItem('first_touch_utm_source', utmSource || '')
  localStorage.setItem('first_touch_utm_medium', utmMedium || '')
  localStorage.setItem('first_touch_utm_campaign', utmCampaign || '')
  return {
    first_touch_utm_source: utmSource || '',
    first_touch_utm_medium: utmMedium || '',
    first_touch_utm_campaign: utmCampaign || '',
    last_touch_utm_source: utmSource || '',
    last_touch_utm_medium: utmMedium || '',
    last_touch_utm_campaign: utmCampaign || '',
  }
}
//请生成getReferrerDomain的方法，使用document.referrer获取来源页地址 并返回域名部分
export const getReferrerDomain = (): string | null => {
  const fullReferrer = document.referrer
  if (!fullReferrer) return null

  try {
    const referrerUrl = new URL(fullReferrer)
    const hostname = referrerUrl.hostname
    const parts = hostname.split('.')

    // 适配规则可根据需求调整（比如保留二级域名）
    if (parts.length >= 2) {
      const tld = parts.pop()
      const mainDomain = parts.pop()
      return `${mainDomain}.${tld}`
    }
    return hostname
  } catch (e) {
    console.error('解析来源域名失败：', e)
    return ''
  }
}
