 // Set the date we're counting down to
        const weddingDate = new Date("May 3, 2026 10:30:00").getTime();

        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById("countdown").innerHTML = "TODAY IS THE DAY!";
            }
        }, 1000);

        // Form Submission logic
        document.getElementById('weddingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            this.style.display = 'none';
            document.getElementById('thankYou').style.display = 'block';
        });
// Scratch to Reveal Logic
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.hero-content');
    
    // Set canvas dimensions to match container
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Fill canvas with gold color
        ctx.fillStyle = '#c5a059'; // var(--gold)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Add overlay text or styling
         // Removed 'Scratch to Reveal' text in favor of finger gesture
 
         // Reset blend mode for drawing text then change to scratch mode
         ctx.globalCompositeOperation = 'destination-out';
     }
 
     // Initialize
     resizeCanvas();
     // Handle resizing window
     window.addEventListener('resize', () => {
         // Only resize if the canvas hasn't been completely scratched yet to avoid resetting
         if(canvas.style.opacity !== '0') {
             // Need to save the image data, resize, and put it back in a real robust app
             // But simple redraw for now
             resizeCanvas();
         }
     });
 
     // Scratching logic
     let isDrawing = false;
     let scratchedPixels = 0;
     const scratchRadius = 40;
     const gestureIcon = document.getElementById('fingerGesture');
 
     function getPosition(e) {
         const rect = canvas.getBoundingClientRect();
         // Handle both mouse and touch events
         const clientX = e.touches ? e.touches[0].clientX : e.clientX;
         const clientY = e.touches ? e.touches[0].clientY : e.clientY;
         return {
             x: clientX - rect.left,
             y: clientY - rect.top
         };
     }
 
     function scratch(e) {
         if (!isDrawing) return;
         e.preventDefault(); // Prevent scrolling on touch
         
         // Start scratching: hide gesture icon
         if (gestureIcon) {
             gestureIcon.style.display = 'none';
         }

         const pos = getPosition(e);
         
         ctx.beginPath();
         ctx.arc(pos.x, pos.y, scratchRadius, 0, Math.PI * 2);
         ctx.fill();
         
         checkReveal();
     }
 
     function checkReveal() {
         // Quick check to see if we've scratched enough to reveal automatically
         scratchedPixels++;
         if(scratchedPixels > 50) { // arbitrary threshold of scratch events
             canvas.style.transition = 'opacity 1s ease-out';
             canvas.style.opacity = '0';
             setTimeout(() => {
                 canvas.style.display = 'none';
                 // Trigger Confetti!
                 if (typeof confetti === 'function') {
                     confetti({
                         particleCount: 150,
                         spread: 70,
                         origin: { y: 0.6 },
                         colors: ['#c5a059', '#fffdfa', '#7a8c5e']
                     });
                 }
             }, 1000);
         }
     }

    // Event Listeners
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', () => { isDrawing = false; });
});

gsap.to(".hero-content",{opacity:1,y:0,duration:1.5,ease:"power3.out",delay:.4});
gsap.from(".monogram",{scale:.7,opacity:0,duration:1.2,ease:"back.out(1.7)"});

const bg=document.querySelector(".hero-bg");
document.addEventListener("mousemove",e=>{
let x=(e.clientX/window.innerWidth-.5)*20;
let y=(e.clientY/window.innerHeight-.5)*20;
gsap.to(bg,{x,y,duration:1.2,ease:"power3.out"});
});

function scrollNext(){
gsap.to(window,{duration:1.3,scrollTo:"#next",ease:"power3.inOut"});
}

function enter(){
gsap.to(".hero",{filter:"blur(6px)",duration:.6,onComplete:scrollNext});
}

