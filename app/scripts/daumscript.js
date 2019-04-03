window.onload = function () {
  var mapContainer = document.getElementById('daum_map'),
      mapCenter = new daum.maps.LatLng(37.5665, 126.9780),
      mapOption = {
          center: mapCenter,
          level: 3
      };

  var map = new daum.maps.Map(mapContainer, mapOption);

  map.addOverlayMapTypeId(daum.maps.MapTypeId.ROADVIEW);

  var roadviewContainer = document.getElementById('daum_pano');
  var roadview = new daum.maps.Roadview(roadviewContainer);
  var roadviewClient = new daum.maps.RoadviewClient();

  roadviewClient.getNearestPanoId(mapCenter, 50, function(panoId) {
      roadview.setPanoId(panoId, mapCenter);
  });

  var mapWalker = null;
  daum.maps.event.addListener(roadview, 'init', function() {
      mapWalker = new MapWalker(mapCenter);
      mapWalker.setMap(map);
      daum.maps.event.addListener(roadview, 'viewpoint_changed', function(){
          var viewpoint = roadview.getViewpoint();
          mapWalker.setAngle(viewpoint.pan);
      });
      daum.maps.event.addListener(roadview, 'position_changed', function(){
          var position = roadview.getPosition();
          mapWalker.setPosition(position);
      });
  });

  daum.maps.event.addListener(map, 'click', function(mouseEvent){
    var position = mouseEvent.latLng;
    roadviewClient.getNearestPanoId(position, 100, function(panoId) {
        if (panoId === null) {
          return;
        } else {
          roadview.setPanoId(panoId, position);
        }
    });
    mapWalker.setPosition(position);
  });

  var selectAPI = document.getElementById('selectAPI');
  selectAPI.onchange = function () {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
}



function MapWalker(position){
    var content = document.createElement('div');
    var figure = document.createElement('div');
    var angleBack = document.createElement('div');

    content.className = 'MapWalker';
    figure.className = 'figure';
    angleBack.className = 'angleBack';

    content.appendChild(angleBack);
    content.appendChild(figure);

    var walker = new daum.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 1
    });

    this.walker = walker;
    this.content = content;
}


MapWalker.prototype.setAngle = function (angle) {
    var threshold = 22.5;
    for( var i = 0; i < 16; i++) {
        if(angle > (threshold * i) && angle < (threshold * (i + 1))){
            var className = 'm' + i;
            this.content.className = this.content.className.split(' ')[0];
            this.content.className += (' ' + className);
            break;
        }
    }
};

MapWalker.prototype.setPosition = function(position){
    this.walker.setPosition(position);
};

MapWalker.prototype.setMap = function(map){
    this.walker.setMap(map);
};
