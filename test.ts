import * as path from 'path'
import test from 'ava'
import geojson from './index'

test('readFileSync', t => {
  const features = geojson.readFileSync(path.join(__dirname, 'fixtures', 'Point.geojson'))
  t.true(!!features)
})

test('writeFileSync', t => {
  const features = geojson.readFileSync(path.join(__dirname, 'fixtures', 'Point.geojson'))
  geojson.writeFileSync(path.join(__dirname, 'tmp', 'Point.geojson'), features, ['foo'])
  t.true(!!features)
})
