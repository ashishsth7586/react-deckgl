import React, { useState } from 'react'

import { StaticMap, MapContext, NavigationControl } from 'react-map-gl'
import DeckGL, { COORDINATE_SYSTEM, TileLayer, ArcLayer, BitmapLayer, _GlobeView } from 'deck.gl'

const MAPBOX_API_TOKEN = "pk.eyJ1IjoiYXNoaXNoc3RoNzU4NiIsImEiOiJja3AwMDIxeHQwYXBiMnZudnk0NmpucjMyIn0.7peIWq98UrRmicrjoS6k9g"

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [54.0000, 24.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "AE",
        "tons": 1978950
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-61.8000, 17.0500]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "AG",
        "tons": 5.4431
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [18.5000, -12.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "AO",
        "tons": 183.17
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-64.0000, -34.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "AR",
        "tons": 63507.6
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [13.3333, 47.3333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "AT",
        "tons": 188.774
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [90.0000, 24.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BD",
        "tons": 5375.46
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [4.0000, 50.8333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BE",
        "tons": 74863.3
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [25.0000, 43.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BG",
        "tons": 475.481
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [50.5500, 26.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BH",
        "tons": 4389.15
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [114.6667, 4.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BN",
        "tons": 19547.2
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [114.6667, 4.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BN",
        "tons": 19547.2
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-55.0000, -10.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "BR",
        "tons": 14172.7
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-95.0000, 60.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CA",
        "tons": 595472
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [96.8333, -12.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CC",
        "tons": 415.945
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [15.0000, -1.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CG",
        "tons": 15.334
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-5.0000, 8.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CI",
        "tons": 24.355
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-5.0000, 8.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CI",
        "tons": 24.355
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-71.0000, -30.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CL",
        "tons": 18018.5
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.0000, 35.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CN",
        "tons": 1439720
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-72.0000, 4.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CO",
        "tons": 980.591
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0000, 10.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CR",
        "tons": 43.225
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.6667, -10.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CX",
        "tons": 16143.6
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [33.0000, 35.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CY",
        "tons": 136.139
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [15.5000, 49.7500]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "CZ",
        "tons": 834.717
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [9.0000, 51.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "DE",
        "tons": 91078
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [43.0000, 11.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "DJ",
        "tons": 206.908
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [10.0000, 56.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "DK",
        "tons": 5473.45
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-70.6667, 19.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "DO",
        "tons": 2.746
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [26.0000, 59.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "EE",
        "tons": 37796.9
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [30.0000, 27.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "EG",
        "tons": 3096.88
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-4.0000, 40.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "ES",
        "tons": 27573
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [26.0000, 64.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "FI",
        "tons": 49870.4
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [175.0000, -18.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "FJ",
        "tons": 248.354
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [2.0000, 46.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "FR",
        "tons": 12950.8
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-2.0000, 54.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "GB",
        "tons": 45376.5
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [43.5000, 42.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "GE",
        "tons": 6.514
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-2.0000, 8.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "GH",
        "tons": 224.94
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [22.0000, 39.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "GR",
        "tons": 5050.58
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-90.2500, 15.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "GT",
        "tons": 89.775
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-59.0000, 5.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "GY",
        "tons": 51.23
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [114.1667, 22.2500]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "HK",
        "tons": 8976.49
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-86.5000, 15.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "HN",
        "tons": 75.358
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [15.5000, 45.1667]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "HR",
        "tons": 970.482
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [20.0000, 47.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "HU",
        "tons": 331.328
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [120.0000, -5.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "ID",
        "tons": 851236
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-8.0000, 53.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "IE",
        "tons": 2720.42
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [34.7500, 31.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "IL",
        "tons": 10678.1
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [77.0000, 20.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "IN",
        "tons": 145663
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [12.8333, 42.8333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "IT",
        "tons": 80527.2
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-77.5000, 18.2500]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "JM",
        "tons": 24.0173
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [36.0000, 31.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "JO",
        "tons": 21626.9
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [138.0000, 36.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "JP",
        "tons": 991472
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [38.0000, 1.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "KE",
        "tons": 35.32
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.0000, 13.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "KH",
        "tons": 2992.85
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [127.5000, 37.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "KR",
        "tons": 203411
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [127.5000, 37.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "KR",
        "tons": 203411
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [47.6581, 29.3375]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "KW",
        "tons": 93.311
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.8333, 33.8333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "LB",
        "tons": 102.39
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [81.0000, 7.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "LK",
        "tons": 4705.48
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-9.5000, 6.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "LR",
        "tons": 13.17
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [24.0000, 56.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "LT",
        "tons": 70641.7
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [25.0000, 57.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "LV",
        "tons": 2246.96
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-5.0000, 32.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MA",
        "tons": 75309.1
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [19.0000, 42.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "ME",
        "tons": 18.223
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [47.0000, -20.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MG",
        "tons": 19.5744
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [98.0000, 22.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MM",
        "tons": 512.699
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [98.0000, 22.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MM",
        "tons": 512.699
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.0000, 46.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MN",
        "tons": 1.1
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [14.5833, 35.8333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MT",
        "tons": 85.91
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [57.5500, -20.2833]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MU",
        "tons": 590.157
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-102.0000, 23.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MX",
        "tons": 20860.7
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [112.5000, 2.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MY",
        "tons": 1143090
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.0000, -18.2500]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "MZ",
        "tons": 163.827
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [17.0000, -22.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "NA",
        "tons": 686.812
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [165.5000, -21.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "NC",
        "tons": 1.4
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [8.0000, 10.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "NG",
        "tons": 115364
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [5.7500, 52.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "NL",
        "tons": 38272.3
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [10.0000, 62.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "NO",
        "tons": 6646
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [174.0000, -41.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "NZ",
        "tons": 63837.3
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [57.0000, 21.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "OM",
        "tons": 11021.6
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-80.0000, 9.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PA",
        "tons": 252.333
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-76.0000, -10.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PE",
        "tons": 588.829
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [147.0000, -6.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PG",
        "tons": 155011
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [122.0000, 13.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PH",
        "tons": 8033.91
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [70.0000, 30.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PK",
        "tons": 7943.6
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [20.0000, 52.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PL",
        "tons": 11146.8
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-8.0000, 39.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "PT",
        "tons": 3845.18
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [51.2500, 25.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "QA",
        "tons": 130164
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [55.6000, -21.1000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "RE",
        "tons": 1390.14
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [25.0000, 46.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "RO",
        "tons": 936.284
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [100.0000, 60.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "RU",
        "tons": 242840
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [100.0000, 60.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "RU",
        "tons": 242840
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [45.0000, 25.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SA",
        "tons": 795079
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [159.0000, -8.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SB",
        "tons": 2.3
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [55.6667, -4.5833]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SC",
        "tons": 705.106
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [15.0000, 62.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SE",
        "tons": 16964.3
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [103.8000, 1.3667]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SG",
        "tons": 1055290
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [15.0000, 46.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SI",
        "tons": 1722.78
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [19.5000, 48.6667]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SK",
        "tons": 235.07
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-14.0000, 14.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SN",
        "tons": 589.53
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [49.0000, 10.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SO",
        "tons": 17.322
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-88.9167, 13.8333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SV",
        "tons": 122.802
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": {}
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SW",
        "tons": 4.6893
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [38.0000, 35.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "SY",
        "tons": 26.06
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [1.1667, 8.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TG",
        "tons": 73.64
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [100.0000, 15.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TH",
        "tons": 382492
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [125.5167, -8.5500]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TL",
        "tons": 24782
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [9.0000, 34.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TN",
        "tons": 401.712
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.0000, 39.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TR",
        "tons": 50194.7
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-61.0000, 11.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TT",
        "tons": 91.6071
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [121.0000, 23.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TW",
        "tons": 542428
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [121.0000, 23.5000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TW",
        "tons": 542428
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.0000, -6.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "TZ",
        "tons": 59.737
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [32.0000, 49.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "UA",
        "tons": 2720.71
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-97.0000, 38.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "US",
        "tons": 2070740
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-56.0000, -33.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "UY",
        "tons": 66.34
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.0000, 16.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "VN",
        "tons": 316710
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.0000, 16.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "VN",
        "tons": 316710
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [45.1667, -12.8333]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "YT",
        "tons": 8.8
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [24.0000, -29.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "ZA",
        "tons": 45952.2
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [30.0000, -15.0000]
      },
      "properties": {
        "ImportExport": "Import",
        "Year": 2020,
        "Country": "ZM",
        "tons": 7.1168
      }
    }
  ]
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

const INITIAL_VIEW_STATE = {
  longitude: 2.27,
  latitude: 48.86,
  zoom: 4,
  bearing: 0,
  pitch: 30
}
const NAV_CONTROL_STYLE = {
  // position: 'absolute',
  top: 10,
  left: 10
};

const App = () => {

  const layers = [

    new TileLayer({
      data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,
      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north }
        } = props.tile;
        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          _imageCoordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          bounds: [west, south, east, north]
        });
      }
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.ImportExport === 'Import'),
      // Styles
      getSourcePosition: f => f.geometry.coordinates,
      getTargetPosition: f => [115.7333304, -32.0499998],
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
      getHeight: 0.1
    })
  ]

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      views={new _GlobeView({
        resolution: 10
      })}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
      mapStyle={MAP_STYLE}
    >
      {/* <StaticMap mapStyle={MAP_STYLE} mapboxApiAccessToken={MAPBOX_API_TOKEN} /> */}
      {/* < NavigationControl style={NAV_CONTROL_STYLE} /> */}
    </DeckGL >
  )
}

export default App