window.onload = function () {
  ymaps.ready(function () {
    var map, marker, player;
    var ll = [55.75074572, 37.61782676];

    function markMapAt(latlng) {
    	marker.geometry.setCoordinates(latlng);
      map.panTo(latlng);
    }

  	map = new ymaps.Map('yandex_map', {center: ll, zoom: 15, controls: ['zoomControl', 'fullscreenControl', 'typeSelector']});
    marker = new ymaps.Placemark(ll);
    map.geoObjects.add(marker);
    if (ymaps.panorama.isSupported()) {
    	ymaps.panorama.locate(ll).done(function (panoramas) {
      	player = new ymaps.panorama.Player('yandex_pano', panoramas[0], { controls: ['zoomControl', 'fullscreenControl', 'panoramaName'], suppressMapOpenBlock: 'true' });
        player.events.add('panoramachange', function (event) {
        	markMapAt(event.get('target').getPanorama().getPosition());
        });
      }, function (error) {
      	console.log(error)
      });
      map.events.add('click', function (event) {
      	if (player && marker) {
        	var latlng = event.get('coords')
        	player.moveTo(latlng).done(function () {
          	markMapAt(latlng);
          });
        }
      });
    } else {
  		console.log('Yandex panorama is not supported!');
    }
  });
  var selectAPI = document.getElementById('selectAPI');
  selectAPI.onchange = function () {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
}
