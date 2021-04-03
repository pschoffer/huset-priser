#!/usr/bin/node

const { Command } = require('commander');
const { getAllLocations, getLocations, printLocations, panic } = require('./lib');
const debug = require('debug')('command')

const program = new Command();


program.version('0.0.1');

program
    .description("This command lets you check price of proprties")
    .option('-d, --debug', 'output extra debugging')

    .option('-A, --list_locations', 'list supported locations')
    .option('-l, --location <location_id...>', 'Show statistics for <location_id>. Multiple')
    .option("-a, --all_locations", "all supported locations. (Takes a while)")
    .option("-p <number>", "Number of pages to check (more means better precision but slower)")

    .option("-F, --flats", "Pick flats (default flats + houses)")
    .option("-H, --houses", "Pick houses (default flats + houses)")
    .option("-f <xx m^2>", "Area from")
    .option("-t <xx m^2>", "Area to");

program.parse(process.argv);

const options = program.opts();

if ( ! options.flats && ! options.houses) {
    options.flats = true;
    options.houses = true;
}

if ( options.list_locations && !options.location ) {
    options.all_locations = true;
}

debug("finished procesing params", options);

const locations = options.all_locations ? getAllLocations() : getLocations(options.location);

debug("Locations to be cheked ", locations)

if ((!locations) || (!options.all_locations) && locations.length !== options.location.length) {
    panic("Failed to fetch locations")
}

if (options.list_locations) {
    printLocations(locations);
    process.exit();
}
