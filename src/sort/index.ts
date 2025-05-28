
/**
 * @deprecated use ../sortBy('name')
 */
export const byName = (a: any, b: any) => {
  console.warn("DEPRECATED: use ../sortBy('name')")
  if (a && a.name && b && b.name && a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return -1;
}

/**
 * @deprecated use ../sortBy('createdAt')
 */
export const byCreatedAt = (a: any, b: any) => {
  console.warn("DEPRECATED: use ../sortBy('createdAt')")
  return (a.createdAt || 0) - (b.createdAt || 0)
}

/**
 * @deprecated use ../sortBy('createdAt', 'desc')
 */
export const byCreatedAtDesc = (a: any, b: any) => {
  console.warn("DEPRECATED: use ../sortBy('createdAt', 'desc')")
  return (b.createdAt || 0) - (a.createdAt || 0)
}
