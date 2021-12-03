
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

    Also removes buses as they come out of service
    */
    if (markers.length !== locations.length) {
        if (markers.length === 0){
            for (i=0; i<locations.length; i++){
            const busLocation = [locations[i].attributes.longitude, locations[i].attributes.latitude];
            let busMarker = new mapboxgl.Marker()
            .setLngLat(busLocation)
            .addTo(map);
            markers.push(busMarker);
            }
            console.log("Initiated Buses to markers array");
        }
        if (markers.length > locations.length) {
            let difference = markers.length - locations.length;
            for (i=1; i<=difference; i++){
                let indexToRemove = markers.length - 1;
                markers[indexToRemove].remove();
                markers.pop();
            }
            console.log("-----POPPED-----");
            console.log("-----POPPED-----");
            console.log("-----POPPED-----");
            console.log("-----POPPED-----");
            console.log("-----POPPED-----");
        }
        if (markers.length < locations.length) {
            let difference = locations.length - markers.length;
            for (i=difference; i>0; i--){
                let totalBuses = locations.length;
                const busLocation = [locations[totalBuses - i].attributes.longitude, locations[totalBuses - i].attributes.latitude];
                let busMarker = new mapboxgl.Marker()
                .setLngLat(busLocation)
                .addTo(map);
                markers.push(busMarker);
            }
            console.log("-----PUSHED-----");
            console.log("-----PUSHED-----");
            console.log("-----PUSHED-----");
            console.log("-----PUSHED-----");
            console.log("-----PUSHED-----");
        }
    }
    // Updates bus locations for each bus in 'markers'
    for (i=0; i<locations.length; i++) {
        const busLocation = [locations[i].attributes.longitude, locations[i].attributes.latitude];
        markers[i].setLngLat(busLocation)
    }
    
    let inServiceDiv = document.getElementById("in-service");
    inServiceDiv.style.visibility = "visible";
    inServiceDiv.style.marginTop = (window.innerHeight - 70) + "px";
    inServiceDiv.textContent = "Buses in Service: " + locations.length;
    
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

