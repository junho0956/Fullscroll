import React, { useEffect } from "react";
import "./App.css";
import $ from "jquery";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

function fullset() {
  let pageidx = $("#fullpage > .fullsection").length; // fullpage 안에 sec의 개수 확인
  for (let i = 1; i <= pageidx; i++) {
    $("#fullpage > .quick > ul").append("<li></li>");
  }
  $("#fullpage .quick ul :first-child").addClass("on"); // 화면 로드시 첫번째 퀵버튼에 불넣기

  // 마우스 휠 이벤트
  $(window).bind("mousewheel", function (event) {
    let page = $(".quick ul li.on");
    if ($("body").find("#fullpage:animated").length >= 1) return false;

    // 마우스 휠을 위로
    if (event.originalEvent.wheelDelta > 0) {
      let before = page.index();
      if (page.index() >= 0)
        page.prev().addClass("on").siblings(".on").removeClass("on"); // 퀵버튼 옮기기
      let pagelength = 0;
      for (let i = 1; i < before; i++) {
        pagelength += $(".full" + i).height();
      }
      // 첫번째 페이지가 아닐 때 (index는 0부터 시작)
      if (page.index() > 0) {
        page = page.index() - 1;
        $("#fullpage").animate({ top: -pagelength + "px" }, 1000, "swing");
      } else return false;
    }
    // 마우스 휠을 아래로
    else if (event.originalEvent.wheelDelta < 0) {
      let nextPage = page.index() + 1; // 다음페이지 번호
      let lastpageNum = $(".quick ul li").length;
      // 현재 페이지 번호 <= (마지막 페이지번호-1) 일때만 페이지 이동
      if (page.index() <= $(".quick ul li").length - 1) {
        page.next().addClass("on").siblings(".on").removeClass("on");
      }
      if (nextPage < lastpageNum) {
        // 마지막페이지가 아닐 때만 animate
        let pagelength = 0;
        for (let i = 1; i < nextPage + 1; i++) {
          // 총 페이지 구하기
          // 현재 1페이지에서 2페이지로 이동하기 위해서는 1번 페이지 길이 + 2번 페이지 길이가 더해짐
          pagelength += $(".full" + i).height();
        }
        $("#fullpage").animate({ top: -pagelength + "px" }, 1000, "swing");
      } else return false;
    }
  });
  $(window).resize(function () {
    // 페이지가 100%이기 때문에 브라우저가 resize될 때 마다 스크롤 위치가 그대로 남아있는 것을 방지하기 위해
    let resizeIdx = $(".quick ul li.on").index() + 1;
    let pagelength = 0;
    for (let i = 1; i < resizeIdx; i++) {
      pagelength += $(".full" + i).height();
    }
    $("#fullpage").animate({ top: -pagelength + "px" }, 0);
  });
}

function quickClick() {
  $(".quick li").click(function () {
    let idx = $(this).index() + 1;
    let length = 0;
    for (let i = 1; i < idx; i++) {
      length += $(".full" + i).height();
    }
    if ($("body").find("#fullpage:animated").length >= 1) return false;
    $(this).addClass("on").siblings("li").removeClass("on");
    $("#fullpage").animate({ top: -length + "px" }, 800, "swing");
    return false;
  });
}

function App() {
  useEffect(() => {
    $(document).ready(function () {
      fullset();
      quickClick();
    });
  });

  return (
    <div class="home">
      <div id="fullpage">
        <div className="quick">
          <ul></ul>
        </div>
        <div className="fullsection full1" pagenum="1">
          <span>1 page</span>
        </div>
        <div className="fullsection full2" pagenum="2">
          <span>2 page</span>
        </div>
        <div className="fullsection full3" pagenum="3">
          <span>3 page</span>
        </div>
        <div className="fullsection full4" pagenum="4">
          <span>4 page</span>
        </div>
      </div>
    </div>
  );
}

export default App;
