(function () {
  var en;
  var kin;

  $(function () {
    kin = $("#font_1");
    en = $("#font_2");

    window.addEventListener("deviceproximity", deviceproximityHandler);
  });

  // 検知範囲の状況が変化
  function deviceproximityHandler(event) {
    if (!event.value) {
      // センサーの検知範囲に物体がある
      showKin();
    } else {
      // センサーの検知範囲に物体はない
      showEn();
    }
  }

  // 近
  function showKin() {
    en
      .stop()
      .transition({scale: 0});
    kin
      .stop()
      .css({display: "block", scale: 1.5})
      .transition({scale: 1}, 500, "easeOutCubic");
  }

  // 遠
  function showEn() {
    en
      .stop()
      .transition({scale: 1});
    kin
      .stop()
      .transition({scale: 1.5}, 200, "easeInCubic", function () {
        $(this).css({display: "none"});
      });
  }
})();