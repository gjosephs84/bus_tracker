# bus_tracker
# Description
When the button is clicked, the map displays the location of all currently-running MBTA buses on Route 77 between Harvard Station and Arlington Heights. The map updates the location markers of the buses every fifteen seconds.

Outbound buses are displayed with grey icons:
<img src="bus-outbound.png">

Inbound buses are displayed with brown icons:
<img src="bus-inbound.png">

Aditionally, any bus marker can be clicked/tapped to view a popup displaying its direction.

# How to Run
Visit <a href="gjosephs84.github.io/bus_tracker">gjosephs84.github.io</a> to see Route 77 bus locations in real time

To edit/run the bus tracker on your own machine, download/clone the repository. Replace the mapboxgl key at line 78 of index.html with your own key.

## Change Route Information

This program will work with any MBTA bus route. To change the route replace '77' at line 109 of mapanimation.js with the desired route number:

const url = 'https://api-v3.mbta.com/vehicles?filter[route]=77&include=trip'

For full functionality, also update map center at line 83 of index.html to correspond with the midpoint coordinates of the desired route.

To render a line representing the desired route, acquire coordinates for all points along the route, and use them to replace the contents of the coordinates array beginning on line 95 of index.html.

# Roadmap of future improvements
In future updates, I will add next stop information to the popups for each bus.