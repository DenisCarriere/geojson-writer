[![Build Status](https://travis-ci.org/DenisCarriere/geojson-helpers.svg?branch=master)](https://travis-ci.org/DenisCarriere/geojson-helpers)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geojson-helpers/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geojson-helpers?branch=master)
[![npm version](https://badge.fury.io/js/geojson-helpers.svg)](https://badge.fury.io/js/geojson-helpers)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/geojson-helpers/master/LICENSE)

# GeoJSON Helpers

Helps read & write GeoJSON files based on [RFC 7946 GeoJSON](http://www.macwright.org/2016/11/07/the-geojson-ietf-standard.html).

## Install

```bash
$ npm install --save geojson-helpers
```

## Quickstart

```javascript
import geojson from 'geojson-helpers'

const featureCollection = geojson.readFileSync('places.geojson')
// <--Data processing-->
geojson.writeFileSync('new-places.geojson', featureCollection)
```

## Features

- Reads GeoJSON files
- Writes GeoJSON files
- Compact indentation, 1 line per feature (smallest file size possible)
- Limits coordinates decimals to a maximum of 6
- Does not include CRS

# writeFileSync

Writes GeoJSON file

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `geojson` **FeatureCollection** GeoJSON FeatureCollection
-   `properties` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))>]** Only include the following properties

# readFileSync

Reads GeoJSON file

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** File must be a GeoJSON FeatureCollection

# Changelog

## 0.1.0 - 2016-11-09

Begining of project `geojson-helpers`.

- readFileSync
- writeFileSync