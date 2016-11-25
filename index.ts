import { resolve, dirname } from 'path'
import * as fs from 'fs'

export type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.GeometryObject>

/**
 * Writes GeoJSON file
 *
 * @param {string} path
 * @param {FeatureCollection} geojson GeoJSON FeatureCollection
 * @param {Array<string|number>} [properties] Only include the following properties
 */
export function writeFileSync(path: string, geojson: FeatureCollection, properties?: Array<string | number>): void {
  mkdir(path)
  const stream = fs.createWriteStream(path)
  writeHeader(stream)
  geojson.features.map((feature, index, array) => {
    if (properties !== undefined) { feature.properties = pick(feature.properties, properties) }
    feature.geometry.coordinates = toFix(feature.geometry.coordinates)
    feature = removeEmptyProperties(feature)
    writeFeature(stream, feature, index, array)
  })
  writeFooter(stream)
}

/**
 * Remove Empty values
 *
 * @param {GeoJSON.Feature<any>} feature
 */
export function removeEmptyProperties(feature: GeoJSON.Feature<any>) {
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
 */
export function readFileSync(path: string): FeatureCollection {
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

function toFix(array: Array<any>): Array<any> {
  return array.map(value => {
    if (typeof(value) === 'object') { return toFix(value) }
    return Number(value.toFixed(6))
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
