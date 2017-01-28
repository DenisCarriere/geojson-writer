import { resolve, dirname } from 'path'
import * as deepSlice from 'deep-slice'
import * as fs from 'fs'
import {pick} from './utils'

export type Features = GeoJSON.FeatureCollection<any>
export type Feature = GeoJSON.Feature<any>

interface Options {
  properties?: string[]
  precision?: number
  z?: boolean
}

/**
 * Writes GeoJSON file
 *
 * @param {string} path File path
 * @param {Features} geojson GeoJSON FeatureCollection
 * @param {Options} options Options
 * @param {string[]} [options.properties] List of properties to include in GeoJSON
 * @param {number} [options.precision=6] Reduce coordinate precision
 * @param {boolean} [options.boolean=false] Drop Z coordinates
 * @param {Array<string|number>} [options.properties] Only include the following properties
 * @returns {void}
 */
export function writer(path: string, geojson: Features, options: Options = {}): void {
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
    if (z) { feature.geometry.coordinates = deepSlice(feature.geometry.coordinates, 0, 2) }

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
export function reader(path: string): Features {
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
  stream.write(']\n}')
}

function writeFeatureEnd(stream: fs.WriteStream, index: number, array: any[]): void {
  if (index + 1 !== array.length) { stream.write(',\n')
  } else { stream.write('\n') }
}

/**
 * Reduce coordinate precision
 */
function toFix(array: any[], precision = 6): any[] {
  return array.map(value => {
    if (typeof(value) === 'object') { return toFix(value) }
    return Number(value.toFixed(precision))
  })
}

/**
 * Write Feature
 */
function writeFeature(stream: fs.WriteStream, feature: any, index: number, array: any[]): void {
  stream.write(JSON.stringify(feature))
  writeFeatureEnd(stream, index, array)
}

export default {
  writer,
  reader,
}
