const { default: axios } = require('axios');
const allLocations = require('./locations.json');
const debug = require('debug')('lib')

const getLocations = (ids) => {
    return allLocations.filter(location => ids.includes(location.id + ''));
}

const getAllLocations = () => {
    return allLocations;
}

const printLocations = (locations) => {
    for (const location of locations) {
        console.log(`${location.id}: ${location.name}`);
    }

}

const getDataFromBooli = async (locations, options) => {
    const result = [];

    for (const location of locations) {
        const data = await getDataFromBooliForLocation(location.id, options);
        result.push({ ...location, data });
    }

    return result;
}

const query = `
query SearchSold($page: Int!, $areaId: ID!, $objectType: String!)
{
    searchSold(input: {areaId: $areaId, page:$page, filters: [{ key: "objectType", value: $objectType}], sort:"soldDate"}) {
        pages,
        result {
            soldPrice{
                raw
            },
            soldSqmPrice {
                raw
            }
            soldDate
        }
    }
}`
const endpoint = 'https://www.booli.se/graphql'

const getDataFromBooliForLocation = async (locationId, options) => {
    const pagesToCheck = options.pages || 1;
    let data = [];
    let objectTypesArray = [];
    if (options.flats) {
        objectTypesArray = objectTypesArray.concat(['Lägenhet']);
    }
    if (options.houses) {
        objectTypesArray = objectTypesArray.concat(['Villa', 'Parhus', 'Radhus', 'Kedjehus']);
    }
    objectType = objectTypesArray.join(',');

    for (let page = 1; page <= pagesToCheck; page++) {
        debug(`Fetching from ${endpoint}`);

        try {
            const variables = {
                page,
                areaId: locationId,
                objectType
            }
            const response = await axios.post(endpoint, { query, variables }, { headers: { 'Content-type': 'application/json' } });

            if (response.data) {
                data = data.concat(response.data.data.searchSold.result)
            }

        } catch (e) {
            console.error("Request failed", e.response.data)
        }

    }

    debug(`Fetched ${data.length} records for location ${locationId}`)

    return data;
}

const panic = (msg) => {
    console.error(msg);
    process.exit(1);
}

module.exports = {
    getLocations,
    getAllLocations,
    printLocations,
    getDataFromBooli,
    panic
}