# Huset-priser

This is an attempt to aggregate data about a house market and show them in some nice way.

There is not-open graphql endpoint of `booli.se` that we am using here. We then get the same data their websit does [here](https://www.booli.se/slutpriser/nacka/76/)

## Install

```
$ npm install
```

## Usage example

This example is showing query over all supported locations (`-a`) and only for flats (`-F`). Result is then piped to `jq` to show json in a nice way.

```
$ ./index.js -aF | jq
[
  {
    "id": 13,
    "name": "Sollentuna",
    "averageSoldPrice": 2715857,
    "averageSoldSqmPrice": 41240,
    "recordCount": 35
  },
  {
    "id": 20,
    "name": "Täby",
    "averageSoldPrice": 3397857,
    "averageSoldSqmPrice": 47130,
    "recordCount": 35
  },
...
```

## Available switches

See command `./index --help` for avaialable switches

## Debug

To se debug lines export folloving env variable:

```
export DEBUG=command,lib
```