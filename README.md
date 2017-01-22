# [GeoJSON Writer](https://www.npmjs.com/package/geojson-writer)

[![Build Status](https://travis-ci.org/DenisCarriere/geojson-writer.svg?branch=master)](https://travis-ci.org/DenisCarriere/geojson-writer)
[![Circle CI](https://circleci.com/gh/DenisCarriere/geojson-writer.svg?style=svg)](https://circleci.com/gh/DenisCarriere/geojson-writer)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geojson-writer/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geojson-writer?branch=master)
[![npm version](https://badge.fury.io/js/geojson-writer.svg)](https://badge.fury.io/js/geojson-writer)
[![Known Vulnerabilities](https://snyk.io/test/github/deniscarriere/geojson-writer/badge.svg)](https://snyk.io/test/github/deniscarriere/geojson-writer)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/geojson-writer/master/LICENSE)

Reads & writes GeoJSON files based on [RFC 7946 GeoJSON](http://www.macwright.org/2016/11/07/the-geojson-ietf-standard.html).

## Install

```bash
$ npm install --save geojson-writer
```

## Quickstart

```javascript
import {writer, reader} from 'geojson-writer'

const data = reader('places.geojson')
// <--Data processing-->
writer('places-processed.geojson', data)
```

## Features

-   Reads GeoJSON files
-   Writes GeoJSON files
-   Compact indentation, 1 line per feature (smallest file size possible)
-   Limits coordinates decimals to a maximum of 6
-   Does not include CRS

## API

### writer

Writes GeoJSON file

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** File path
-   `geojson` **Features** GeoJSON FeatureCollection
-   `options` **\[Options](default {})** Options
    -   `options.properties` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** List of properties to include in GeoJSON
    -   `options.precision` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** Reduce coordinate precision (optional, default `6`)
    -   `options.boolean` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Drop Z coordinates (optional, default `false`)
    -   `options.properties` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))>]** Only include the following properties

Returns **void** 

### removeEmptyProperties

Remove Empty values

**Parameters**

-   `feature` **Feature** 

### reader

Reads GeoJSON file

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** File must be a GeoJSON FeatureCollection

Returns **Features** GeoJSON FeatureCollection

### toFix

Reduce coordinate precision

**Parameters**

-   `array`  
-   `precision`   (optional, default `6`)

### writeFeature

Write Feature

**Parameters**

-   `stream`  
-   `feature`  
-   `index`  
-   `array`  
