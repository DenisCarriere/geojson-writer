import { resolve, dirname } from 'path'
import * as fs from 'fs'

export type Features = GeoJSON.FeatureCollection<any>
export type Feature = GeoJSON.Feature<any>

interface Options {
  properties?: Array<string | number>
  precision?: number
  z?: boolean
}

/**
 * Writes GeoJSON file
 *
 * @param {string} path
 * @param {Features} geojson GeoJSON FeatureCollection
 * @param {Array<string|number>} [properties] Only include the following properties
 * @returns {void}
 */
export function writeFileSync(path: string, geojson: Features, options?: Options): void {
  // Define options
  const properties = options.properties
  const precision = options.precision || 6
  const z = options.z

  mkdir(path)
  const stream = fs.createWriteStream(path)
  writeHeader(stream)
  geojson.features.map((feature, index, array) => {
    // Include specifici attributes
    if (properties !== undefined) { feature.properties = pick(feature.properties, properties) }

    // Reduce coordinates precision
    feature.geometry.coordinates = toFix(feature.geometry.coordinates, precision)

    // Drop z Coordinates
    if (z) { feature.geometry.coordinates = dropZ(feature.geometry.coordinates) }

    // Remove empty properties
    feature = removeEmptyProperties(feature)

    // Write
    writeFeature(stream, feature, index, array)
  })
  writeFooter(stream)
}

/**
 * Remove Empty values
 *
 * @param {Feature} feature
 */
export function removeEmptyProperties(feature: Feature) {
  const properties: any = {}
  Object.keys(feature.properties).map(key => {
    const value = feature.properties[key]
    if (value !== undefined && value !== '' && value !== null) {
      properties[key] = value
    }
  })
  feature.properties = properties
  return feature
}

/**
 * Reads GeoJSON file
 *
 * @param {string} path File must be a GeoJSON FeatureCollection
 * @returns {Features} GeoJSON FeatureCollection
 */
export function readFileSync(path: string): Features {
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}

function mkdir(path: string) {
  const folder = dirname(resolve(path))
  if (!fs.existsSync(folder)) { fs.mkdirSync(folder) }
}

function writeHeader(stream: fs.WriteStream) {
  stream.write('{\n')
  stream.write('"type": "FeatureCollection",\n')
  stream.write('"features": [\n')
}

function writeFooter(stream: fs.WriteStream) {
  stream.write(']\n}\n')
}

function writeFeatureEnd(stream: fs.WriteStream, index: number, array: Array<any>): void {
  if (index + 1 !== array.length) { stream.write(',\n')
  } else { stream.write('\n') }
}

function toFix(array: Array<any>, precision = 6): Array<any> {
  return array.map(value => {
    if (typeof(value) === 'object') { return toFix(value) }
    return Number(value.toFixed(precision))
  })
}

function dropZ(array: Array<any>): Array<any> {
  return array.map(value => {
    if (typeof(value) === 'object' && typeof(value[0]) === 'object') {
      return dropZ(value)
    }
    return [value[0], value[1]]
  })
}

function pick(object: any, keys: Array<string | number>): any {
  const container: any = {}
  Object.keys(object).map(key => {
    if (keys.indexOf(key) !== -1) { container[key] = object[key] }
  })
  return container
}

function writeFeature(stream: fs.WriteStream, feature: any, index: number, array: Array<any>): void {
  stream.write(JSON.stringify(feature))
  writeFeatureEnd(stream, index, array)
}

export default {
  readFileSync,
  writeFileSync,
}
