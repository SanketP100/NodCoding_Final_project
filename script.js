function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

loco()

function navAnima(){
    
var nav = document.querySelector('nav')

document.querySelector('main').addEventListener('wheel', function(dets){
     let dit = dets.deltaY

    if(dit > 0){
    //    console.log('hloooo');
       gsap.to(nav, {
        transform:`translate(-50%) translateY(-150%)`,
        duration: .3,
        deltaY: 1,
        
    })
       
    }else{
        // console.log('hiiiii');
        gsap.to(nav, {
            transform:`translate(-50%) translateY(-0%)`,
            duration: .3,
            
        })
    }
    
})

}

navAnima()

var flower = document.querySelectorAll('.flower')
var moving = 0 

// pathvalue = "M 27.5 304.8 Q 27.5 127 25.309917886184234 0.009442025230507411 m -4.043801642276315 -4 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"

flowerdets = function(flower) {
  
flower.addEventListener("mousemove", function(dets){
  // console.log(dets.movementX);
  // flower.style.transform = `translateX(${dets.movementX}%)`
  moving = dets.movementX/7
  gsap.to(flower,{
    transform : `translateX(${moving}%) rotate(${moving/2}deg)`,
    // duration: 1
  })
  
})
}
