window.onload = function() {
  // 全景图展示 panorama
  var panorama = new BMap.Panorama("baidu_pano");
  panorama.setPosition(new BMap.Point(114.057861, 22.543097)); //根据经纬度坐标展示全景图
  panorama.setPov({ heading: -40, pitch: 6 });

  panorama.addEventListener("position_changed", function(e) {
    //全景图位置改变后，普通地图中心点也随之改变
    var pos = panorama.getPosition();
    // map.setCenter(new BMap.Point(pos.lng, pos.lat));
    marker.setPosition(pos);
  });

  //普通地图展示 normal map
  // var mapOption = {
  // 		mapType: BMAP_NORMAL_MAP,
  // 		maxZoom: 18,
  // 		drawMargin:0,
  // 		enableFulltimeSpotClick: true,
  // 		enableHighResolution:true
  // 	}
  var map = new BMap.Map("baidu_map");
  var testpoint = new BMap.Point(114.057861, 22.543097);
  map.centerAndZoom(testpoint, 18);
  map.enableScrollWheelZoom(true);
  var marker = new BMap.Marker(testpoint);
  map.addOverlay(marker);
  var panoramacoverage = new BMap.PanoramaCoverageLayer(); // Create traffic flow layer instance
  map.addTileLayer(panoramacoverage);
  // map.removeTileLayer(traffic); //toggle coverage layer off
  map.addControl(
    new BMap.MapTypeControl({
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
    })
  );

  var panoramaService = new BMap.PanoramaService();
  map.addEventListener("click", function(e) {
    panoramaService.getPanoramaByLocation(e.point, function(data) {
      if (data == null) {
        console.error("Street View data not found for this location.");
        return;
      } else {
        marker.setPosition(e.point);
        panorama.setPosition(e.point);
        panorama.setPov({ heading: -40, pitch: 6 });
      }
    });
  });

  var selectAPI = document.getElementById("selectAPI");
  selectAPI.onchange = function() {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
};
