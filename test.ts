import * as path from 'path'
import * as fs from 'fs'
import {reader, writer} from './'

describe('reader', () => {
  const features = reader(path.join(__dirname, 'fixtures', 'Point.geojson'))
  test('read', () => expect(features).toBeDefined())
})

describe('writer', () => {
  const destination = path.join(__dirname, 'tmp', 'Point.geojson')
  const features = reader(path.join(__dirname, 'fixtures', 'Point.geojson'))
  writer(destination, features, {properties: ['foo']})
  test('write', () => expect(fs.existsSync(destination)).toBeTruthy())
})
