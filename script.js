gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

// Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// Tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // We don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function Mousefollower(){
  window.addEventListener("mousemove", function(dets){
    document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}

function MouseChaptaKaro(){
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  var timeout;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

    timeout = setTimeout(function (){
      document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  });

  tl.to(".boundingh1", {
    y: 0,
    duration: 2,
    ease: Expo.easeInOut,
    stagger: .2,
    delay: -1,
  });

  tl.from("#lhead", {
    y: -10,
    duration: 1.5,
    ease: Expo.easeInOut,
    opacity:0,
    delay: -1,
  });
}

document.querySelectorAll(".elem").forEach(function (elem){
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mousemove", function (dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3.easeOut,
      left: dets.clientX - elem.querySelector("img").width / 2,
      top: diff - elem.querySelector("img").height / 2,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
  elem.addEventListener("mouseleave", function (dets){
    gsap.to(elem.querySelector("img"),{
      opacity: 0,
    });
  });
});

MouseChaptaKaro();
firstPageAnim();
Mousefollower();
