const allLocations = require('./locations.json');

const getLocations = ( ids ) => {
    return allLocations.filter( location => ids.includes(location.id + '') );
}

const getAllLocations = () => {
    return allLocations;
}

const printLocations = (locations) => {
    for (const location of locations) {
        console.log(`${location.id}: ${location.name}`);
    }

}

const panic = (msg) => {
    console.error(msg);
    process.exit(1);
}

module.exports = {
    getLocations,
    getAllLocations,
    printLocations,
    panic
}