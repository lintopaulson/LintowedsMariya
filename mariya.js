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
        
        // Add overlay text
        ctx.font = '30px Playfair Display, serif';
        ctx.fillStyle = '#fffdfa';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2);

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
        
        const pos = getPosition(e);
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, scratchRadius, 0, Math.PI * 2);
        ctx.fill();
        
        checkReveal();
    }

    function checkReveal() {
        // Quick check to see if we've scratched enough to reveal automatically
        // Getting image data is expensive, do it less often or use a simpler heuristic
        // We'll just fade it out after some interaction happens
        scratchedPixels++;
        if(scratchedPixels > 50) { // arbitrary threshold of scratch events
            canvas.style.transition = 'opacity 1s ease-out';
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.style.display = 'none';
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

