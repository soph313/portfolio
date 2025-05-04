gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll(".story-section");

const bgColors = {
  intro: "#f5f3ef",
  chair: "#bd764c",
  "hope-chest": "#6b7779",
  star: "#ED9C8B",
  closing: "#f5f3ef"
};

let currentIndex = 0;

function clearScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

function setupScrollAnimations(section) {
  gsap.utils.toArray("#chair .content-block").forEach((block, i) => {
    gsap.fromTo(block,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          end: "top 5%",
          scrub: true,
          markers: false,
          toggleActions: "play none none reverse",
          onLeave: () => gsap.to(block, { opacity: 0, duration: 0.5 }),
        onEnterBack: () => gsap.to(block, { opacity: 1, duration: 0.5 })
          
        }
      }
    );
  });
  
  // Hope chest section
  gsap.utils.toArray("#hope-chest .content-block").forEach((block, i) => {
    gsap.fromTo(block,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: block,
          start: "top 105%",
          end: "top 70%",
          scrub: true,
          markers: false,
          toggleActions: "play none none reverse",
          onLeave: () => gsap.to(block, { opacity: 0, duration: 0.5 }),
        onEnterBack: () => gsap.to(block, { opacity: 1, duration: 0.5 })
        }
      }
    );
  });
  
  // Star section
  gsap.utils.toArray("#star .content-block").forEach((block, i) => {
    gsap.fromTo(block,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: block,
          start: "top 90%",
          end: "top 7%",
          scrub: true,
          markers: false,
          toggleActions: "play none none reverse",
          onLeave: () => gsap.to(block, { opacity: 0, duration: 0.5 }),
          onEnterBack: () => gsap.to(block, { opacity: 1, duration: 0.5 })
        }
      }
    );
  });
  
  // Closing section
  gsap.utils.toArray("#closing .content-block").forEach((block, i) => {
    gsap.fromTo(block,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          end: "top 10%",
          scrub: true,
          markers: false,
          toggleActions: "play none none reverse",
          onLeave: () => gsap.to(block, { opacity: 0, duration: 0.5 }),
        onEnterBack: () => gsap.to(block, { opacity: 1, duration: 0.5 })
        }
      }
    );
  });
}



function showSection(index) {
  clearScrollTriggers(); // Kill old triggers

  sections.forEach((section, i) => {
    if (i === index) {
      section.classList.add("active");
      section.style.display = "block";
      gsap.to("body", {
        backgroundColor: bgColors[section.id] || "#f5f3ef",
        duration: 1
      });

      setupScrollAnimations(section); 

      window.scrollTo({ top: 0, behavior: "auto" });

    } else {
      section.classList.remove("active");
      section.style.display = "none";
    }
  });
}

document.querySelectorAll(".next").forEach(btn =>
  btn.addEventListener("click", () => {
    if (currentIndex < sections.length - 1) {
      currentIndex++;
      showSection(currentIndex);
    }
  })
);

document.querySelectorAll(".prev").forEach(btn =>
  btn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showSection(currentIndex);
    }
  })
);

showSection(currentIndex);


      
