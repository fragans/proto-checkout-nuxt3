export const useDateFormat = (date: string, isLess: boolean) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: isLess ? 'short' : 'long',
    year: 'numeric'
  })
}
