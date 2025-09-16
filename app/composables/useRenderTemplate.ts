/**
 * Render a template string with given variables.
 *
 * Template string should contains underscored key (e.g. _key_),
 * and the variables object should have the same key.
 *
 */
export const useRenderTemplate = (template: string, data: Record<string, string>) => {
  if (!template) return ''
  return template.replace(/_([A-Za-z0-9_]+)_/g, (_match, key) => {
    return data[key] ?? ''
  })
}