window.onload = function() {
  var defaultLatLng = new qq.maps.LatLng(22.542736819858433, 114.0578822386656);

  var map = new qq.maps.Map(document.getElementById("tencent_map"), {
    center: defaultLatLng,
    zoom: 16
  });
  //设置路网图层 setting panorama layer

  var marker = new qq.maps.Marker({
    position: defaultLatLng,
    map: map
  });

  //panorama layer
  var pano_layer = new qq.maps.PanoramaLayer();
  pano_layer.setMap(map);
  // 创建街景 creating streetview
  var pano = new qq.maps.Panorama(document.getElementById("tencent_pano"), {
    pano: "10041056151009143016900",
    disableMove: false,
    pov: {
      heading: 20,
      pitch: 15
    },
    zoom: 1
  });

  qq.maps.event.addListener(pano, "position_changed", function(evt) {
    marker.setPosition(evt.target.position);
  });

  var pano_service = new qq.maps.PanoramaService();
  qq.maps.event.addListener(map, "click", function(evt) {
    var point = evt.latLng;
    var radius;
    pano_service.getPano(point, radius, function(result) {
      pano.setPano(result.svid);
      marker.setPosition(evt.latLng);
    });
  });
  //创建街景类

  var selectAPI = document.getElementById("selectAPI");
  selectAPI.onchange = function() {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
};
