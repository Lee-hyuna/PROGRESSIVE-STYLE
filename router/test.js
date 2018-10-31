var _nowScene = 1;
var _actionFlag = false;
var _slideTime = 500;
var _moveTime = 500;
var _maxScene = 6;
var _actionType = "easeInOutCubic"; //회면이동 옵션
var setIntervalEvent;
var clearIntervalEvent;

$(document).ready(function() {
  hair_change();
  clearIntervalEvent = function() {
    clearTimeout(setIntervalEvent);
    $("#scene1")
      .removeClass(
        "main_hair1 main_hair2 main_hair3 main_hair4 main_hair5 main_hair6"
      )
      .addClass("main_hair1");
  };

  $("button.num_page").on("click", function() {
    clearTimeout(setIntervalEvent);
    /*$('#scene2').removeClass('on1 on2 on3').addClass('on' + ($('button.num_page').index(this) + 1).toString());*/
    deco_hair_change($("button.num_page").index(this));
  });

  if (window.addEventListener)
    /** DOMMouseScroll is for mozilla. */
    window.addEventListener("DOMMouseScroll", wheel, false);

  /** IE/Opera. */
  window.onmousewheel = document.onmousewheel = wheel;
});

function clearSceneClass() {
  for (var i = 0; i < _maxScene + 2; i++) {
    $("#kakaoPromotion").removeClass("promotion_scene" + i);
  }
}

function setScene(num) {
  if (true == _actionFlag) return; // 화면 이동중 동작하지 않는다
  if (num < 1) return;
  if (num > 6) return;
  if (num == _nowScene) return;

  _actionFlag = true;

  delay = 10;

  $(".intro_kakaohairshop").each(function(index) {
    $(this).delay(delay).animate(
        {
          top: index - num + 1 + "00%"
        },
        _slideTime,
        _actionType,
        function() {
          if (index - num + 1 == 0) {
            _actionFlag = false;
            clearIntervalEvent();

            if (1 == num) {
              hair_change();
              clearIntervalEvent = function() {
                clearTimeout(setIntervalEvent);
                $("#main_hair")
                  .removeClass(
                    "main_hair1 main_hair2 main_hair3 main_hair4 main_hair5 main_hair6"
                  )
                  .addClass("main_hair1");
              };
            } else if (2 == num) {
              deco_hair_change();
              clearIntervalEvent = function() {
                clearTimeout(setIntervalEvent);
                $("#scene2")
                  .removeClass("on1 on2 on3")
                  .addClass("on1");
              };
            }
          }
        }
      );
  });

  clearSceneClass();
  $(".intro_kakaohairshop").removeClass("off");
  $(".intro_kakaohairshop")
    .eq(_nowScene - 1)
    .addClass("off");

  if (num != 1) {
    $("#kakaoPromotion")
      .delay(_moveTime)
      .addClass("promotion_scene" + (num + 1));
  } else if (num == 1) {
    $("#kakaoPromotion")
      .delay(_moveTime)
      .addClass("promotion_scene" + num);
  }

  $(".link_page").removeClass("on");
  $(".link_page")
    .eq(num - 1)
    .addClass("on");

  _nowScene = num;
}

function setMove(isUp) {
  if (isUp) {
    setScene(_nowScene - 1);
  } else {
    setScene(_nowScene + 1);
  }
}

function handle(delta) {
  if (Math.abs(delta) < 0.9) return;
  if (true == _actionFlag) return;

  if (delta < 0) {
    setMove(false);
  } else {
    setMove(true);
  }
}

function wheel(event) {
  var delta = 0;
  if (!event)
    /* For IE. */
    event = window.event;
  if (event.wheelDelta) {
    /* IE/Opera. */
    delta = event.wheelDelta / 120;
    /** In Opera 9, delta differs in sign as compared to IE.
     */
    if (window.opera) delta = -delta;
  } else if (event.detail) {
    /** Mozilla case. */
    /** In Mozilla, sign of delta is different than in IE.
     * Also, delta is multiple of 3.
     */
    delta = -event.detail / 3;
  }
  /** If delta is nonzero, handle it.
   * Basically, delta is now positive if wheel was scrolled up,
   * and negative, if wheel was scrolled down.
   */

  if (delta) handle(delta);
}

function hair_change(nowNum) {
  var nextNum = nowNum < 6 && nowNum !== "undefined" ? nowNum + 1 : 1;
  if (nowNum > 0) {
    $("#scene1")
      .delay(500)
      .removeClass("main_hair" + nowNum)
      .addClass("main_hair" + nextNum);
  }

  setIntervalEvent = setTimeout(function() {
    hair_change(nextNum);
  }, 1100);
}
