// Initialize Leaflet Map
document.addEventListener('DOMContentLoaded', function() {
    // Coordinates for 100, 128 Padukka Road, Horana 12400
    const locationLat = 6.724743;
    const locationLng = 80.057155;
    
    // Initialize map
    const map = L.map('map').setView([locationLat, locationLng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add marker for the address
    const marker = L.marker([locationLat, locationLng]).addTo(map);
    
    // Add popup with address
    marker.bindPopup('<b>100, 128 Padukka Road</b><br>Horana 12400<br>Sri Lanka').openPopup();
    
    // Add circle to highlight the area
    L.circle([locationLat, locationLng], {
        color: '#027e6f',
        fillColor: '#027e6f',
        fillOpacity: 0.1,
        radius: 500
    }).addTo(map);
});
