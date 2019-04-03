window.onload = function () {
// 全景图展示 panorama
var panorama = new BMap.Panorama('baidu_pano');
	panorama.setPosition(new BMap.Point(120.320032, 31.589666)); //根据经纬度坐标展示全景图
	panorama.setPov({heading: -40, pitch: 6});

	panorama.addEventListener('position_changed', function(e){ //全景图位置改变后，普通地图中心点也随之改变
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
	var testpoint = new BMap.Point(120.320032, 31.589666);
	map.centerAndZoom(testpoint, 18);
  map.enableScrollWheelZoom(true);
	var marker = new BMap.Marker(testpoint);
	marker.enableDragging();
	map.addOverlay(marker);
  map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
	marker.addEventListener('dragend',function(e){
		panorama.setPosition(e.point); //拖动marker后，全景图位置也随着改变
		panorama.setPov({heading: -40, pitch: 6});}
	);

	var selectAPI = document.getElementById('selectAPI');
  selectAPI.onchange = function () {
    var selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value != "") {
      window.location.href = selectedOption.value;
    }
  };
}
