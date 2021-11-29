
/* The constant 'markers' is an array that holds markers pushed from the 'run' 
function. Its length changes depending on how many instances of the 77 bus are
running at any given time */
const markers = [];

async function run(){
    // get bus data    
	
    const locations = await getBusLocations();
    /* The following section of code will push specific busses to 'markers' 
    based on how many 77 buses are currently on the road, and add as needed
    when more busses come into service.

    I need to update this section to also subtract buses coming out of service
    */
    if (markers.length !== locations.length) {
        for (i=0; i<locations.length; i++){
        const busLocation = [locations[i].attributes.longitude, locations[i].attributes.latitude];
        let busMarker = new mapboxgl.Marker()
        .setLngLat(busLocation)
        .addTo(map);
        markers.push(busMarker);
        }
    }
    // Updates bus locations for each bus in 'markers'
    for (i=0; i<locations.length; i++) {
        const busLocation = [locations[i].attributes.longitude, locations[i].attributes.latitude];
        console.log(markers[i]);
        markers[i].setLngLat(busLocation)
        console.log(busLocation);
    }
	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=77&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

