[![Build Status](https://travis-ci.org/DenisCarriere/geojson-helpers.svg?branch=master)](https://travis-ci.org/DenisCarriere/geojson-helpers)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geojson-helpers/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geojson-helpers?branch=master)
[![npm version](https://badge.fury.io/js/geojson-helpers.svg)](https://badge.fury.io/js/geojson-helpers)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/geojson-helpers/master/LICENSE)

# GeoJSON Helpers

Helps read & write GeoJSON FeatureCollection files.

## Install

```bash
$ npm install --save geojson-helpers
```

## Quickstart

```javascript
import geojson from 'geojson-helpers'

const featureCollection = geojson.readFileSync('places.geojson')
// <--Data processing-->
geojson.writeFileSync('new-places.geojson', featureCollection, ['name', 'name:en', 'place'])
```

## Features

- Reads '.geojson'
- Outputs Feature Collection
- Write file uses buffer
- Compact indentation, 1 line per feature (smallest file size possible)
- Limits coordinates decimals to a maximum of 6
- Does not include CRS
