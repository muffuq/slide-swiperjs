let cursor = document.querySelector('.cursor');
let welcome = document.querySelector(".welcome");
let slider = document.querySelector(".swiper");
let background = document.querySelector(".back-video-wrapper");
let backVideo = document.getElementById("slaytBackVideo");
let videoo = document.querySelector(".back-video-wrapper video");
let logo = document.querySelector(".logo");
let slide = document.querySelectorAll(".slide-text");
let music = document.getElementById("slaytmusic");
let slidernon = document.getElementsByClassName("swiper-slide");
let slideractive = document.getElementsByClassName("swiper-slide-active");
let slidertext = document.querySelector(".swiper-slide-active h1");
let buttontext = document.querySelector(".button--fenrir");
let slideh1 = document.querySelectorAll(".slide-h1");
let header = document.querySelector(".header");
let menuitems = document.querySelectorAll(".menu-item");
let menudiv = document.querySelector(".menuu");
let menucont = document.querySelector(".menu-cont");
let loadbartext = document.querySelector(".load-bar h1");
let loadbar = document.querySelector(".load-bar");
let loadbutton = document.querySelector(".loadbutton");
let footer = document.querySelector(".footer");
let cursorslider = document.querySelector(".cursor-slider");
let cursordrag = document.querySelector(".cursor-drag");
let body = document.body;

let openn = false

const tl = new TimelineMax();

animProp(0, 100, 5, (x)=> {
  loadbartext.textContent = `Loading ${Math.floor(x)}%`;
},()=> { 
  gsap.to(loadbutton, { opacity: 1, duration: 0.5 })
  music.volume = 0.0;
 })

function openweb() {
  if (openn === false) {
    openn = true
      tl.fromTo(loadbar, 0.5,{ opacity:"1", display:"flex" }, { opacity:"0", display:"none" })
      .fromTo(slider, 1, { y: "1000", opacity: "0" }, { y: "0", opacity: "1", display: "block" })
      .fromTo(header, 0.5, { display: "none", opacity: "0" }, { display: "flex", opacity: "1" })
      .fromTo(footer, 0.5, { display: "none", opacity: "0" }, { display: "flex", opacity: "1" })
      .fromTo(background, 1, { opacity: "0", display: "none" }, { opacity: "1", display: "block" })
      .fromTo(cursor, 1, { display: "none", opacity: "0" }, { opacity: "1", display: "flex" })

    setTimeout(() => {
      music.volume = 0.1;
      playMusic()
    }, 2500)
  }
  else {
    return
  }
};

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorslider.style.left = x - 40 + 'px';
  cursorslider.style.top = y - 40 + 'px';
  cursordrag.style.left = x - 74 + 'px';
  cursordrag.style.top = y - 50 + 'px';
});

let menuu = false

menudiv.onclick = function () {
  openmenu()
};

function openmenu() {
  if (menuu == false) {
    document.getElementById("logo").src = "./assets/img/logo-black.svg"
    document.getElementById("menuuu").src = "./assets/img/close.svg"
    tl.fromTo(slider, 0.2, { opacity: "1", display: "block" }, { opacity: "0", display: "none" })
      .fromTo(background, 0.2, { opacity: "1", display: "block" }, { opacity: "0", display: "none" })
      .fromTo(menucont, 0.4, { opacity: "0", display: "none" }, { opacity: "1", display: "flex" })
      music.pause()
    menuu = true
  }
  else {
    document.getElementById("logo").src = "./assets/img/logo.svg"
    document.getElementById("menuuu").src = "./assets/img/menu-icon.svg"
    tl.fromTo(menucont, 0.4, { opacity: "1", display: "flex" }, { opacity: "0", display: "none" })
      .fromTo(background, 0.2, { opacity: "0", display: "none" }, { opacity: "1", display: "block" })
      .fromTo(slider, 0.2, { opacity: "0", display: "none" }, { opacity: "1", display: "block" })
      music.play()
    menuu = false
  }

};

for (let i = 0; i < menuitems.length; i++) {
  const element = menuitems[i];
  element.onclick = function (e) {
    let slideNumber = element.dataset["listnumber"]
    swiper.slideTo(slideNumber)
    openmenu()
  }
}


function playMusic() {
  music.play()
  TweenMax.to(music, { volume: 0.3, duration: 3, ease: "linear" })
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.1,
  spaceBetween: -1,
  loop: true,
  resistanceRatio: 0.10,
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let isChanging = false;
swiper.on('slideChange', function () {

  if (isChanging == false) {
    $(backVideo).fadeOut()
    setTimeout(() => {
      isChanging = false;
    }, 200);
  }
  $(backVideo).fadeIn()
  isChanging = true;

  setTimeout(() => {
    let videoUrl = document.getElementsByClassName("swiper-slide-active")[0].dataset["video"]
    let musicUrl = document.getElementsByClassName("swiper-slide-active")[0].dataset["music"]
    // $(".swiper-slide-active video").attr("src");
    backVideo.src = videoUrl;
    music.src = musicUrl;
    music.play()
  }, 50)

});



document.addEventListener("click", e => {
  if (isChanging) {
    e.stopPropagation();
    e.preventDefault();
  }
}, true);

let IsTouch = false

swiper.on("touchStart", function () {
  if (IsTouch === false) {
    var x = e.clientX;
    var y = e.clientY;
    tl.fromTo(slide, 0.2, { fontSize: "50px", opacity: "1" }, { fontSize: "40px", opacity: "0.7" })
    .fromTo(cursorslider, 0.2, { display:"flex", opacity: "1" }, { display:"none", opacity:"0" })
    .fromTo(cursordrag, 0,{ display:"none", opacity:"0" }, { display:"block", opacity:"1" })
    IsTouch = true
  }
});

swiper.on("touchEnd", function () {
  tl.fromTo(slide, 0.2, { fontSize: "40px", opacity: "0.7" }, { fontSize: "50px", opacity: "1" })
  .fromTo(cursorslider, 0.2, { display:"none", opacity: "0" }, { display:"flex", opacity:"1" })
  .fromTo(cursordrag, 0,{ display:"block", opacity:"1" }, { display:"none", opacity:"0" })
  setTimeout(() => {
    IsTouch = false
  }, 200)
});

swiper.on("touchMove", function (swiper){
  var x = swiper.touches.currentX;
  var y = swiper.touches.currentY;
  cursordrag.style.left = x - 74 + 'px';
  cursordrag.style.top = y - 50 + 'px';
  console.log(x,y)
})

window.onkeydown = function (olay) {
  if (olay.keyCode == 32) {
    if (music.paused) {
      music.play();
    }
    else {
      music.pause();
    }
  }
};

function menudegis() {
  console.log("deneme");
};

function animProp(from, to, duration, cb, cb2) {
  let obj = { x: from };
  gsap.to(obj, { x: to, duration, onUpdate() {cb(obj.x)}, onComplete: cb2 });
}