// Mock types for development

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'STORE_OWNER';
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: string;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  isActive: boolean;
  isPublic?: boolean;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  ownerId?: string;
  category?: 'HAIR_SALON' | 'NAIL_SALON' | 'EYELASH' | 'RELAXATION' | 'ESTHETIC';
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  staff?: Staff[];
  menus?: Menu[];
  reviews?: Review[];
  businessHours?: BusinessHour[];
  holidays?: Holiday[];
  averageRating?: number;
  totalReviews?: number;
}

export interface Staff {
  id: string;
  storeId: string;
  name: string;
  email: string;
  password: string;
  role: 'OWNER' | 'MANAGER' | 'STAFF';
  avatar?: string;
  bio?: string;
  specialties?: string[];
  experience?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Menu {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  category?: string;
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  storeId: string;
  userId: string;
  staffId?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  totalPrice: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  store?: Store;
  user?: User;
  staff?: Staff | null;
  reservationMenus?: ReservationMenu[];
  payment?: Payment;
}

export interface ReservationMenu {
  id: string;
  reservationId: string;
  menuId: string;
  quantity: number;
  menu?: Menu;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minAmount?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCoupon {
  id: string;
  userId: string;
  couponId: string;
  usedAt?: Date;
  coupon?: Coupon;
}

export interface BusinessHour {
  id: string;
  storeId: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Holiday {
  id: string;
  storeId: string;
  date: Date;
  name: string;
}

export interface Inquiry {
  id: string;
  storeId?: string;
  userId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  reply?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  storeId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreWithDetails extends Store {
  staff: Staff[];
  menus: Menu[];
  reviews: Review[];
  businessHours: BusinessHour[];
  holidays: Holiday[];
  averageRating: number;
  totalReviews: number;
}

export interface ReservationWithDetails extends Reservation {
  store: Store;
  user: User;
  staff: Staff | null;
  reservationMenus: (ReservationMenu & { menu: Menu })[];
  payment?: Payment;
}

export interface CouponWithUsage extends Coupon {
  userCoupons?: UserCoupon[];
  remainingUses?: number;
}

export interface InquiryWithStore extends Inquiry {
  store?: Store;
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReservationFormData {
  storeId: string;
  menuIds: string[];
  staffId?: string;
  date: string;
  startTime: string;
  notes?: string;
  couponCode?: string;
}

export interface StoreFormData {
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export interface MenuFormData {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface StaffFormData {
  name: string;
  email: string;
  password?: string;
  role: 'OWNER' | 'MANAGER' | 'STAFF';
}

export interface CouponFormData {
  name: string;
  description?: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minAmount?: number;
  maxUses?: number;
  validFrom: string;
  validTo: string;
}

export interface BusinessHourFormData {
  [key: number]: {
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  };
}

export interface HolidayFormData {
  date: string;
  name: string;
}

export interface DashboardStats {
  totalReservations: number;
  totalRevenue: number;
  todayReservations: number;
  activeStores: number;
  pendingInquiries: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  resource?: any;
}