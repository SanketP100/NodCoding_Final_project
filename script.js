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

var flowers = document.querySelectorAll(".flower")
var moving = 0 

flowers.forEach(function(flower){
  
  flower.addEventListener("mousemove", function(dets){
    // console.log(dets.movementX);
    // flower.style.transform = `translateX(${dets.movementX}%)`
    moving = dets.movementX*1

    gsap.to(flower,{
      transform : `translateX(${moving}%) rotate(${moving*2}deg)`,
      // duration: .5,
      zIndex:99
    })
    
  })
  
  flower.addEventListener("mouseleave", function(dets){
    // console.log(dets.movementX);
    // flower.style.transform = `translateX(${dets.movementX}%)`
    moving = dets.movementX

    gsap.to(flower,{
      transform : `translateX(${0}%) rotate(${0}deg)`,
      duration:1,
      ease: "elastic.out(1,0.4)",
    })
    
  })

});



var valueA = 25
var stemUp = 50
var stemDown = 0
var direction = 1

var stemPath = `M 27.5 304.8 Q 27.5 127 25.309917886184234 0.009442025230507411 m -4.043801642276315 -4 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0`

setInterval(function(){

var stemPath = `M 27.5 304.8 Q 27.5 127 ${valueA} 0.009442025230507411 m -4.043801642276315 -4 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0`
valueA += direction

if(valueA >= stemUp){
  direction = -1
} else if(valueA <= stemDown) {
  direction = 1
} 

console.log(valueA);

gsap.to('.stem path',{
  attr:{d:stemPath}     
})

gsap.to('.flower',{
  transform : `translateX(${valueA/20}%) rotate(${valueA/5}deg)`,

})


},100)