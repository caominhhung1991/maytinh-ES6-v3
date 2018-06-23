// import _ from 'lodash';
import 'jquery';
import REDIPS from './static/redips-drag-min';
import 'animate.css';

//sass
import './sass/main-robot.scss';

import MayTinh from './components/maytinh/maytinh';

function createNangCao() {
    // se e d d ds e e sdd
    let nangcao = document.createElement("div");
    nangcao.setAttribute("id", 'nangcao');
    nangcao.classList.add("animated");
    return nangcao;
}
 
// let robot = createRobot();
let maytinhClass = new MayTinh();
let maytinhElement = maytinhClass.createMayTinh();
let nangcao = createNangCao();
var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);

// begin APP
let robot = document.getElementById("robot");
robot.appendChild(maytinhElement);
robot.appendChild(nangcao);

if(isMobile === null) {
  console.log('pc')
  maytinhClass.dragElement(maytinhElement);
} else {
  console.log('mobile')
  maytinhClass.touchElement(maytinhElement);
}


var redipsInit, setTable, shiftMode, overflow, shiftAnimation, shiftAfter, toggleConfirm, counter = 0;

// redips initialization
redipsInit = function () {
  // reference to the REDIPS.drag library
  var rd = REDIPS.drag;
  // initialization
  rd.init();
  // set mode option to "shift"
  rd.dropMode = 'switch';
  // set animation loop pause
  rd.animation.pause = 20;
  // enable shift.animation
  rd.shift.animation = true;

  rd.event.switched = function () {
    console.log("set location item");
    setNangCaoLocalStorage();
  }

  rd.event.moved = function (event) {
    console.log("moved")
  }

  rd.event.notMoved = function (event) {
    console.log("not moved");

  }

  rd.event.dblClicked = function () {
    // showXemThem();
  }

  let tam;
  rd.event.clicked = function (row) {
    tam = row;
  }
};

window.onload = () => {
    console.log("window onload")
  // add onload event listener
  if (window.addEventListener) {
    checkInit();
    window.addEventListener('load', redipsInit, false);
  }
  else if (window.attachEvent) {
    checkInit();
    window.attachEvent('onload', redipsInit);
  }
};

function checkInit() {
  let btnShowXemThem = document.getElementById('btnShowXemThem');
  if (window.localStorage.getItem("nangcao") == null) {
    console.log("not")
    // $("#redips-drag").html(maytinh);÷÷÷÷÷÷//
    btnShowXemThem.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';
    redipsInit();
  } else {
    // $("#redips-drag").html(window.localStorage.getItem("nangcao"));
    btnShowXemThem.innerHTML = window.localStorage.getItem("btnShowXemThem");
    redipsInit();
  }
}

function setNangCaoLocalStorage() {
  window.localStorage.setItem("nangcao", document.getElementById('redips-drag').innerHTML);
}
 
function setBtnShowXemThemLocalStorage() {
  window.localStorage.setItem("btnShowXemThem", document.getElementById('btnShowXemThem').innerHTML);
}