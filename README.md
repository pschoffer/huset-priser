# Huset-priser

This is an attempt to aggregate data about a house market and show them in some nice way.

As I couldnt find any usefull API, I will scrape booli's website. Note that the source of data is end prices published on `booli` as you can see [here](https://www.booli.se/slutpriser/nacka/76/)

## Prerequisites

In order to use this script you must have install package `jq` for working with JSON.   
Fedora/CentOS/RedHat:   
```
# dnf install jq
``` 
Ubuntu:   
```
# apt-get install jq
```

Give examples


## Available switches

```
-d                  Print debug lines
-A                  List locations
-l <location_id>    Show statistics for <location_id>
-a                  All supported locations
-p <number>         Number of pages to check

-F                  Pick flats
-H                  Pick houses
-f <xx m^2>         Area from
-t <xx m^2>         Area to
```

Note: `-l` can be used multiple times


## Usage example

This example is showing query over all supported locations (`-a`) and only for flats (`-F`) from 80 (`-f 80`) to 110 (`-t 110`) m^2 of living area.
 
```
$ ./hpriser -aF -f 80 -t 110
LOCATION                AVG PRICE       AVG PRICE/M^2
"Nacka"                 4 105 416       44 745
"Lund"                  2 751 861       30 249
"Huddinge"              2 494 500       27 981
```
