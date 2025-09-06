import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount);
}

export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = new Date(date);
  
  switch (format) {
    case 'long':
      return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    case 'time':
      return d.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return d.toLocaleDateString('ja-JP');
  }
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
}

export function getDayOfWeek(dayIndex: number): string {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[dayIndex];
}

export function generateTimeSlots(start: string, end: string, interval: number = 30): string[] {
  const slots: string[] = [];
  const startTime = new Date(`2000-01-01T${start}`);
  const endTime = new Date(`2000-01-01T${end}`);
  
  while (startTime < endTime) {
    slots.push(startTime.toTimeString().slice(0, 5));
    startTime.setMinutes(startTime.getMinutes() + interval);
  }
  
  return slots;
}

export function calculateEndTime(startTime: string, duration: number): string {
  const start = new Date(`2000-01-01T${startTime}`);
  start.setMinutes(start.getMinutes() + duration);
  return start.toTimeString().slice(0, 5);
}

export function isTimeSlotAvailable(
  time: string,
  duration: number,
  businessStart: string,
  businessEnd: string,
  bookedSlots: { startTime: string; endTime: string }[] = []
): boolean {
  const slotStart = new Date(`2000-01-01T${time}`);
  const slotEnd = new Date(`2000-01-01T${calculateEndTime(time, duration)}`);
  const businessStartTime = new Date(`2000-01-01T${businessStart}`);
  const businessEndTime = new Date(`2000-01-01T${businessEnd}`);
  
  if (slotStart < businessStartTime || slotEnd > businessEndTime) {
    return false;
  }
  
  for (const booking of bookedSlots) {
    const bookingStart = new Date(`2000-01-01T${booking.startTime}`);
    const bookingEnd = new Date(`2000-01-01T${booking.endTime}`);
    
    if (
      (slotStart >= bookingStart && slotStart < bookingEnd) ||
      (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
      (slotStart <= bookingStart && slotEnd >= bookingEnd)
    ) {
      return false;
    }
  }
  
  return true;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const re = /^[\d-+().\s]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}