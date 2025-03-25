import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Format a date to a relative time string (e.g. "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMilliseconds = date.getTime() - now.getTime()
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `em ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`
  } else if (diffInHours > 0) {
    return `em ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
  } else if (diffInMinutes > 0) {
    return `em ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`
  } else if (diffInSeconds > 0) {
    return `em ${diffInSeconds} ${diffInSeconds === 1 ? "segundo" : "segundos"}`
  } else if (diffInDays < 0 && diffInDays > -7) {
    return `há ${Math.abs(diffInDays)} ${Math.abs(diffInDays) === 1 ? "dia" : "dias"}`
  } else if (diffInHours < 0) {
    return `há ${Math.abs(diffInHours)} ${Math.abs(diffInHours) === 1 ? "hora" : "horas"}`
  } else if (diffInMinutes < 0) {
    return `há ${Math.abs(diffInMinutes)} ${Math.abs(diffInMinutes) === 1 ? "minuto" : "minutos"}`
  } else {
    return "agora"
  }
}

/**
 * Format time from a Date object (HH:MM)
 */
export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function isToday(date: string | Date): boolean {
  const today = new Date()
  const compareDate = new Date(date)
  
  return (
    today.getDate() === compareDate.getDate() &&
    today.getMonth() === compareDate.getMonth() &&
    today.getFullYear() === compareDate.getFullYear()
  )
}
