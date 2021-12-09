
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
            let directionClass = ''
            const busLocation = [locations[i].attributes.longitude, locations[i].attributes.latitude];
            const directionID = locations[i].attributes.direction_id;
            if (directionID == 1) {
                var direction = "Inbound to Harvard";
                directionClass = 'marker-inbound'
            } else {
                var direction = "Outbound to Arlington Heights"
                directionClass = 'marker-outbound'
            };
            const popUpContents = "Direction: " + "<br>" + direction;
            // create a div to hold the marker image
            const el = document.createElement('div');
            el.className = directionClass;
            // create the marker
            let busMarker = new mapboxgl.Marker(el)
            .setLngLat(busLocation)
            .setPopup(new mapboxgl.Popup().setHTML(popUpContents))
            .addTo(map);
            markers.push(busMarker);
            }
            console.log("Initiated Buses to markers array");
        }
        // The following removes a marker if a bus goes out of service
        if (markers.length > locations.length) {
            let difference = markers.length - locations.length;
            for (i=1; i<=difference; i++){
                let indexToRemove = markers.length - 1;
                markers[indexToRemove].remove();
                markers.pop();
            }
        }
        // The following adds a new marker if a bus comes into service
        if (markers.length < locations.length) {
            let difference = locations.length - markers.length;
            for (i=difference; i>0; i--){
                let totalBuses = locations.length;
                const busLocation = [locations[totalBuses - i].attributes.longitude, locations[totalBuses - i].attributes.latitude];
                const directionID = locations[i].attributes.direction_id;
            if (directionID == 1) {
                var direction = "Inbound to Harvard";
                directionClass = 'marker-inbound'
            } else {
                var direction = "Outbound to Arlington Heights"
                directionClass = 'marker-outbound'
            };
            const popUpContents = "Direction: " + "<br>" + direction;
                // create a div to hold the marker image
                const el = document.createElement('div');
                el.className = directionClass;
                // create the marker
                let busMarker = new mapboxgl.Marker(el)
                .setLngLat(busLocation)
                .setPopup(new mapboxgl.Popup().setHTML(popUpContents))
                .addTo(map);
                markers.push(busMarker);
            }
        }
    }
    // Updates bus locations for each bus in 'markers'
    for (i=0; i<locations.length; i++) {
        const busLocation = [locations[i].attributes.longitude, locations[i].attributes.latitude];
        const directionID = locations[i].attributes.direction_id;
        const busMarker = markers[i].getElement();
        if (directionID == 0) {
                busMarker.className = 'marker-outbound mapboxgl-marker mapboxgl-marker-anchor-center'
                markers[i].setPopup(new mapboxgl.Popup().setHTML("Direction: <br>Outbound to Arlington Heights"));
            } else {
                busMarker.className = 'marker-inbound mapboxgl-marker mapboxgl-marker-anchor-center'
                markers[i].setPopup(new mapboxgl.Popup().setHTML("Direction: <br>Inbound to Harvard"));  
            }
            
        markers[i].setLngLat(busLocation)
    }
    
    let runButton = document.getElementById("run-button")
    runButton.style.visibility = "hidden";
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

