import * as path from 'path'
import * as fs from 'fs'
import {reader, writer} from './'

// Define Directories
const directories = {
  in: path.join(__dirname, 'test', 'fixtures', 'in'),
  out: path.join(__dirname, 'test', 'fixtures', 'out'),
}
// Define Fixtures
const fixtures = {
  point: {
    in: path.join(directories.in, 'Point.geojson'),
    out: path.join(directories.out, 'Point.geojson'),
  },
}

describe('reader', () => {
  const features = reader(fixtures.point.in)
  test('read', () => expect(features).toBeDefined())
})

describe('writer', () => {
  test('write', async () => {
    writer(fixtures.point.out, reader(fixtures.point.in), {properties: ['foo']})
    expect(fs.existsSync(fixtures.point.out)).toBeTruthy()
  })
})
