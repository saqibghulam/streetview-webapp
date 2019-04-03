window.onload = function () {
  var defaultLatLng = new qq.maps.LatLng(22.543097, 114.057861);

	var map = new qq.maps.Map(document.getElementById("tencent_map"),{
		center: defaultLatLng,
		zoom: 16
	});

  var marker = new qq.maps.Marker({
          map: map,
          position: defaultLatLng,
          draggable: true
      });
	//设置路网图层
	var pano_layer = new qq.maps.PanoramaLayer();
	pano_layer.setMap(map);
	// 创建街景
	var pano = new qq.maps.Panorama(document.getElementById('tencent_pano'), {
		pano: '10041056151009143016900',
		disableMove: false,
		pov: {
			heading: 20,
			pitch: 15
		},
		zoom: 1
	});
	//创建街景类
	var pano_service = new qq.maps.PanoramaService();
	qq.maps.event.addListener(marker, 'dragend', function (evt) {
      var point = evt.latLng;
      var radius;
      pano_service.getPano(point, radius, function (result) {
          pano.setPano(result.svid);
      });
  });

  var selectAPI = document.getElementById('selectAPI');
  selectAPI.onchange = function () {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
}
