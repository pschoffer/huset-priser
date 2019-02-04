### Huset-priser

This is an attempt to aggregate data about a house market and show them in some nice way.

As I couldnt find any usefull API, I will scrape booli's website.

## Usage

This example is showing query over all supported locations (`-a`) and only for flats (`-F`) from 80 (`-f 80`) to 110 (`-t 110`) m^2 of living area.
 
```
$ ./hpriser -aF -f 80 -t 110
LOCATION                AVG PRICE       AVG PRICE/M^2
"Nacka"                 4 105 416       44 745
"Lund"                  2 751 861       30 249
"Huddinge"              2 494 500       27 981
```
