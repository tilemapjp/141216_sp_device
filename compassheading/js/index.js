(function () {

  var $compass;

  $(function () {
    $compass = $("#compass");
    window.addEventListener("deviceorientation", deviceorientationHandler);
  });

  /**
   *
   * @param event
   */
  function deviceorientationHandler(event) {
    //ジャイロセンサー情報取得
    // X軸
    var beta = event.beta;
    // Y軸
    var gamma = event.gamma;
    // Z軸
    var alpha = event.alpha;

    // 方角
    var compassHeading = getCompassHeading(alpha, beta, gamma);

    var html = "";
    html += "方角 : " + compassHeading;
    $("#debug").html(html);

    $compass.css({
      "-webkit-transform": "rotateZ(" + compassHeading + "deg)",
      "-moz-transform": "rotateZ(" + compassHeading + "deg)",
      "transform": "rotateZ(" + compassHeading + "deg)"
    })
  }

  /**
   * 方角算出
   * @param alpha
   * @param beta
   * @param gamma
   * @returns {number}
   */
  function getCompassHeading(alpha, beta, gamma) {
    var degtorad = Math.PI / 180;

    var _x = beta ? beta * degtorad : 0;
    var _y = gamma ? gamma * degtorad : 0;
    var _z = alpha ? alpha * degtorad : 0;

    var cY = Math.cos(_y);
    var cZ = Math.cos(_z);
    var sX = Math.sin(_x);
    var sY = Math.sin(_y);
    var sZ = Math.sin(_z);

    var Vx = -cZ * sY - sZ * sX * cY;
    var Vy = -sZ * sY + cZ * sX * cY;

    var compassHeading = Math.atan(Vx / Vy);

    if (Vy < 0) {
      compassHeading += Math.PI;
    }
    else if (Vx < 0) {
      compassHeading += 2 * Math.PI;
    }

    return compassHeading * ( 180 / Math.PI );
  }
})();