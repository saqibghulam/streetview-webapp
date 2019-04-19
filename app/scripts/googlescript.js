function initialize() {
  var fenway = {
    lat: 22.3193,
    lng: 114.1694
  };
  var map = new google.maps.Map(document.getElementById("google_map"), {
    center: fenway,
    zoom: 16,
    fullscreenControl: false,
    zoomControl: false,
    mapTypeControl: true
  });
  // var streetViewLayer = new google.maps.StreetViewCoverageLayer();
  // streetViewLayer.setMap(map);
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById("google_pano"),
    {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10
      },
      fullscreenControl: false,
      zoomControl: false,
      panControl: false
    }
  );
  map.setStreetView(panorama);

  // map coverage layer button
  var changeMapTypeButton = document.getElementById("map_type_button");
  var coverageLayerBool = false;
  var streetViewLayer = new google.maps.StreetViewCoverageLayer();
  changeMapTypeButton.addEventListener("click", function() {
    if (coverageLayerBool === false) {
      streetViewLayer.setMap(map);
      coverageLayerBool = true;
    } else {
      streetViewLayer.setMap(null);
      coverageLayerBool = false;
    }
  });

  // when map is clicked, pegman moves
  var streetViewService = new google.maps.StreetViewService();
  map.addListener("click", function(event) {
    streetViewService.getPanorama(
      { location: event.latLng, radius: 50 },
      processSVData
    );
  });

  function processSVData(data, status) {
    if (status === "OK") {
      panorama.setPosition(data.location.latLng);
    } else {
      console.error("Street View data not found for this location.");
    }
  }
}

window.onload = function() {
  var selectAPI = document.getElementById("selectAPI");
  selectAPI.onchange = function() {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
};
