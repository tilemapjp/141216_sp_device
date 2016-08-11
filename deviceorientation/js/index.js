(function () {

  //var $zo;

  $(function () {
    "use strict";

    var viewer = new Cesium.Viewer("cesium", {
      timeline : false,
      animation : false,
      baseLayerPicker : false,
      fullscreenButton : false,
      geocoder : false,
      homeButton : false,
      infobox : false,
      imageryProvider : Cesium.createOpenStreetMapImageryProvider()
    });
    //$zo = $("#zo");

    var gn = new GyroNorm();

    gn.init({
      frequency:50,                   // ( How often the object sends the values - milliseconds )
      gravityNormalized:true,         // ( If the garvity related values to be normalized )
      orientationBase:GyroNorm.WORLD, // ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
      decimalCount:2,                 // ( How many digits after the decimal point will there be in the return values )
      logger:null,                    // ( Function to be called to log messages from gyronorm.js )
      screenAdjusted:false            // ( If set to true it will return screen adjusted values. )
    }).then(function(){
      //gn.setHeadDirection();
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
    var alpha = Math.round(event.alpha * 100) / 100;

    //方角
    var heading = 360 - alpha;
    //俯角仰角
    var pitch   = beta - 90;
    if (pitch < -180) {
      pitch = pitch + 360;
      heading = heading - 180;
      if (heading < 0) heading = heading + 360;
    }
    //水平角
    var roll    = gamma;

    var html = "α:" + alpha + ",β:" + beta + ",γ:" + gamma + "<br>";
    html += "方角 : "   + heading + "<br>";
    html += "俯仰角 : " + pitch + "<br>";
    html += "水平角 : " + roll;
    $("#debug").html(html);

    //$zo.css({
    //  "-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
    //  "transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
    //})
  }
var degtorad = Math.PI / 180; // Degree-to-Radian conversion

/*function compassHeading( alpha, beta, gamma ) {

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

}*/

})();