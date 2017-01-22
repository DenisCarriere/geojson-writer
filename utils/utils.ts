/**
 * Pick
 */
export function pick(object: any, keys: string[]): any {
  const container: any = {}
  Object.keys(object).map(key => {
    if (keys.indexOf(key) !== -1) { container[key] = object[key] }
  })
  return container
}
