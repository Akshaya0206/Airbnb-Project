maptilersdk.config.apiKey = mapApiKey;
const map = new maptilersdk.Map({
  container: 'map', 
  style: maptilersdk.MapStyle.STREETS, 
  center: lists.geometry.coordinates, 
  zoom: 9 
});

console.log(lists.geometry.coordinates);
const marker=new maptilersdk.Marker({color:"red"})
  .setLngLat(lists.geometry.coordinates)
  .addTo(map); 
  const popup = new maptilersdk.Popup()
  .setHTML(`<h4>${lists.location}</h4><p>Exact Location will be provided after booking</p>`); 

marker.setPopup(popup);
marker.on('click', () => {
  popup.addTo(map); 
});
