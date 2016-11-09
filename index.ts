import * as path from 'path'
import * as fs from 'fs'

function writeHeader(stream: fs.WriteStream) {
  stream.write('{\n')
  stream.write('"type": "FeatureCollection",\n')
  stream.write('"features": [\n')
}

function writeFooter(stream: fs.WriteStream) {
  stream.write(']\n}\n')
}

function writeFeatureEnd(stream: fs.WriteStream, index: number, array: Array<any>): void {
  if (index + 1 !== array.length) stream.write(',\n')
  else stream.write('\n')
}

function toFix(array: Array<any>): Array<any> {
  return array.map(value => {
    if (typeof(value) === 'object') return toFix(value)
    return Number(value.toFixed(6))
  })
}

function pick(object: any, keys: Array<string | number>): any {
  const properties: any = {}
  Object.keys(object).map(key => {
    if (keys.indexOf(key) !== -1) { properties[key] = object[key] } 
  })
  return properties
}

function writeFeature(stream: fs.WriteStream, feature: any, index: number, array: Array<any>): void {
  stream.write(JSON.stringify(feature))
  writeFeatureEnd(stream, index, array)
}

/**
 * Writes GeoJSON file
 *
 * @param {string} path
 * @param {GeoJSON} geojson
 * @param {Array<string|number>} properties
 */
export function writeFileSync(path: string, geojson: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>, properties?: Array<string | number>): void {
  const stream = fs.createWriteStream(path)
  writeHeader(stream)
  geojson.features.map((feature, index, array) => {
    if (pick) { feature.properties = pick(feature.properties, properties) }
    feature.geometry.coordinates = toFix(feature.geometry.coordinates)
    writeFeature(stream, feature, index, array)
  })
  writeFooter(stream)
}

/**
 * Reads GeoJSON file
 *
 * @param {string} path
 */
export function readFileSync(path: string): GeoJSON.FeatureCollection<GeoJSON.GeometryObject> {
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}

export default {
  readFileSync,
  writeFileSync
}

// /**
//  * # Application
//  * 
//  * ## Pre-Processing
//  * 
//  * $ osmtogeojson overpass-query.osm > overpass-query.geojson
//  */
// const states = readFileSync('overpass-query.geojson')
// states.features = states.features.filter(feature => {
//   return (
//     feature.properties.boundary === 'administrative' &&
//     feature.properties.admin_level === '4' &&
//     feature.properties.id.match(/relation/)
//   )
// })
// writeFileSync('ca-states.geojson', states, ['name:en', 'boundary', 'admin_level', 'name', 'ISO3166-2', 'ref', 'wikidata', 'wikipedia', 'state_code', 'is_in:country', 'is_in:country_code', 'is_in:continent'])
// console.log(states.features.length)