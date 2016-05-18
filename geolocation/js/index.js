(function () {
  var map;

  $(function () {
    // 現在位置の取得
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  });

  function geoSuccess(position) {
    // 緯度
    var lat = position.coords.latitude;
    // 軽度
    var lng = position.coords.longitude;
    // 緯度経度の誤差
    var accuracy = Math.floor(position.coords.accuracy);
    $("#accuracy").html("緯度経度の誤差 : " + accuracy + "m");

    setMap(lat, lng);
  }

  function geoError() {
    alert("Geolocation Error")
  }

  function setMap(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
      zoom: 18,
      scaleControl: true,
      streetViewControl: false,
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      center: latlng
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: latlng
    });
  }
})();