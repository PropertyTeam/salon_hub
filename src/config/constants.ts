export const APP_CONFIG = {
  APP_NAME: 'SalonHub',
  APP_DESCRIPTION: '理想のサロンがきっと見つかる',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://salonhub.com',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
} as const

export const ROUTES = {
  // User routes
  HOME: '/',
  STORES: '/stores',
  STORE_DETAIL: (id: string) => `/store/${id}`,
  STORE_RESERVE: (id: string) => `/store/${id}/reserve`,
  MYPAGE: '/mypage',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Admin routes
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_RESERVATIONS: '/admin/reservations',
  ADMIN_MENUS: '/admin/menus',
  ADMIN_STAFF: '/admin/staff',
  ADMIN_STORE: '/admin/store',
} as const

export const SERVICE_TYPES = {
  HAIR: 'hair',
  NAIL: 'nail',
  EYELASH: 'eyelash',
  MASSAGE: 'massage',
  ESTHETIC: 'esthetic',
} as const

export const SERVICE_TYPE_LABELS = {
  [SERVICE_TYPES.HAIR]: '美容室・ヘアサロン',
  [SERVICE_TYPES.NAIL]: 'ネイルサロン',
  [SERVICE_TYPES.EYELASH]: 'まつげエクステ',
  [SERVICE_TYPES.MASSAGE]: 'リラクゼーション',
  [SERVICE_TYPES.ESTHETIC]: 'エステティック',
} as const