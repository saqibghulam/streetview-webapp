function initialize() {
  var fenway = {
    lat: 42.345573,
    lng: -71.098326
  };
  var map = new google.maps.Map(document.getElementById('google_map'), {
    center: fenway,
    zoom: 14
  });
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('google_pano'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);
}
window.onload = function () {
  var selectAPI = document.getElementById('selectAPI');
  selectAPI.onchange = function () {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
}
