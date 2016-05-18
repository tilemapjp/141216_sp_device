(function () {
  var bu;
  var ru;
  var tsu;

  var fps = 60;

  var setIntervalId;

  $(function () {
    bu = $("#font_1");
    ru = $("#font_2");
    tsu = $("#font_3");

    $(window).on("touchend", touchendHandler);
  });

  function touchendHandler() {
    var mSec = 2000;
    // バイブレーション
    navigator.vibrate(mSec);
    startTxtAnime();
    setTimeout(stopTxtAnime, mSec);
  }

  function startTxtAnime() {
    stopTxtAnime();

    setIntervalId = setInterval(txtUpdate, fps / 1000);
  }

  function stopTxtAnime() {
    if (setIntervalId) clearInterval(setIntervalId);

    bu.css({
      top: 0,
      left: 0
    });

    ru.css({
      top: 0,
      left: 0
    });

    tsu.css({
      top: 0,
      left: 0
    });
  }

  function txtUpdate() {
    var l = 10;
    bu.css({
      top: Math.floor(Math.random() * l) - l / 2,
      left: Math.floor(Math.random() * l) - l / 2
    });

    ru.css({
      top: Math.floor(Math.random() * l) - l / 2,
      left: Math.floor(Math.random() * l) - l / 2
    });

    tsu.css({
      top: Math.floor(Math.random() * l) - l / 2,
      left: Math.floor(Math.random() * l) - l / 2
    });
  }
})();