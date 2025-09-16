export const useRenderTemplate = (template: string, data: Record<string, string>) => {
  if (!template) return ''
  return template.replace(/{\s*(\w+)\s*}/g, (match, key) => {
    return data[key] || ''
  })
}
