(function () {

  //var $zo;

  $(function () {
    "use strict";

    var viewer = new Cesium.Viewer("cesium");
    //$zo = $("#zo");

    var gn = new GyroNorm();

    gn.init().then(function(){
      gn.start(deviceorientationHandler);//function(data){
        // Process:
        // data.do.alpha    ( deviceorientation event alpha value )
        // data.do.beta     ( deviceorientation event beta value )
        // data.do.gamma    ( deviceorientation event gamma value )
        // data.do.absolute ( deviceorientation event absolute value )

        // data.dm.x        ( devicemotion event acceleration x value )
        // data.dm.y        ( devicemotion event acceleration y value )
        // data.dm.z        ( devicemotion event acceleration z value )

        // data.dm.gx       ( devicemotion event accelerationIncludingGravity x value )
        // data.dm.gy       ( devicemotion event accelerationIncludingGravity y value )
        // data.dm.gz       ( devicemotion event accelerationIncludingGravity z value )

        // data.dm.alpha    ( devicemotion event rotationRate alpha value )
        // data.dm.beta     ( devicemotion event rotationRate beta value )
        // data.dm.gamma    ( devicemotion event rotationRate gamma value )
      //});
    }).catch(function(e){
      // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    });

    //window.addEventListener("deviceorientation", deviceorientationHandler);

  });

  /**
   *
   * @param event
   */
  function deviceorientationHandler(data) {
    var event = data.do;
    //ジャイロセンサー情報取得
    // X軸
    var beta = event.beta;
    // Y軸
    var gamma = event.gamma;
    // Z軸
    var alpha = event.alpha;

    var heading = compassHeading( alpha, beta, gamma );

    var html = "gyronorm<br>";
    html += "X回転 : " + beta + "<br>";
    html += "Y回転 : " + gamma + "<br>";
    html += 'Z回転 : ' + alpha + "<br>";
    html += '方角 : ' + heading + "<br>";
    $("#debug").html(html);

    //$zo.css({
    //  "-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
    //  "transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
    //})
  }
var degtorad = Math.PI / 180; // Degree-to-Radian conversion

function compassHeading( alpha, beta, gamma ) {

  var _x = beta  ? beta  * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  // Calculate Vx and Vy components
  var Vx = - cZ * sY - sZ * sX * cY;
  var Vy = - sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan( Vx / Vy );

  // Convert compass heading to use whole unit circle
  if( Vy < 0 ) {
    compassHeading += Math.PI;
  } else if( Vx < 0 ) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)

}

})();