gsap.registerPlugin(ScrollTrigger);

let audio = document.getElementById("backgroundAudio");
audio.volume = 0.3;

const audios = [
    'music/washing.mp3',
    'music/drying.mp3',
    'music/cutting.mp3',
];

const sound = document.querySelector("#backgroundAudio2");

function playSound(index, volume, time) {
    sound.src = audios[index];
    sound.loop = true;
    sound.volume = volume;
    sound.currentTime = time; // Reset sound to start
    sound.play();
}

function stopSound() {
    sound.pause();
    sound.currentTime = 0; // Reset sound when stopping
}

document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.getElementById("start-screen");
    const continueBtn = document.getElementById("continue-btn");
    const main = document.getElementById("main");  
    let elements = document.body.getElementsByClassName("h-box");

    elements[0].style.color = "white";
    main.style.opacity = 0;  
    
    document.body.classList.add("no-scroll");

    continueBtn.addEventListener("click", function () {
        startScreen.style.display = "none"; 
        elements[0].style.color = "black";
        main.style.opacity = 1;  
        document.body.classList.remove("no-scroll"); 
        audio.play();
        playSound(0, .5, 3);

        // Move to the top of the page smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});



const videos = [
    'videos/washing.mov',
    'videos/drying.mov',
    'videos/background.mp4',
    'videos/cutting.mov'
];

const videoElement = document.querySelector("#bg-video");


function updateVideo(index) {
    videoElement.src = videos[index]; // Change video source
    videoElement.play(); // Ensure video starts playing
}

gsap.utils.toArray('.h-box').forEach((section, index) => {
    gsap.fromTo(
        section, 
        {
            opacity: 0, 
            y: 0 
        }, 
        {
            opacity: 1,
            y: 0, 
            scrollTrigger: {
                trigger: section,
                start: "-30% top bottom", 
                end: "20% top bottom", 
                scrub: true, 
                markers: false,
                ease: "power2",
                toggleActions: "play none none reverse", // Fade in when entering, fade out when leaving
                // onEnter: () => gsap.to(section, { opacity: 1, y: 0 }), // Fade in
                onLeave: () => gsap.to(section, { opacity: 0, y: 0 })
            }
        }
    );
});




gsap.to("#main", {
    scrollTrigger: {
        trigger: "#box2",
        start: "75% top",
        end: "bottom",
        scrub: true, 
        markers: false,
        ease: "power2",
        onEnter: () => {
            playSound(1,.5, 0);
            updateVideo(1)}, 
        onLeaveBack: () => {
            stopSound();
            playSound(0, 1, 4);
            updateVideo(0)
        } 
    }
});

gsap.to("#main", {
    scrollTrigger: {
        trigger: "#box6",
        start: "20% top",
        end: "bottom",
        scrub: true,
        markers: false,
        ease: "power2",
        onEnter: () => {
            stopSound();
            gsap.to("#main", { opacity: 0 })
        }, // Fade out the element
        onLeaveBack: () => {
            playSound(1, 1, 0);
            gsap.to("#main", { opacity: 1 })
        } // Fade in the element back to full opacity
    }
});

gsap.to("#main", {
    scrollTrigger: {
        trigger: "#box14",
        start: "50% top",
        end: "bottom",
        scrub: true, 
        markers: false,
        ease: "power2",
        onEnter: () => {
            stopSound();
            playSound(2, .5, 0);
            gsap.to("#main", { opacity: 1 });
            updateVideo(3)
        },
        onLeaveBack: () => {
            stopSound();
            gsap.to("#main", { opacity: 0 }); 
            updateVideo(0)
        }
    }
});



gsap.to('.progress-bar', {
    width: "100%",
    scrollTrigger: {
        trigger: 'body',
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});

  