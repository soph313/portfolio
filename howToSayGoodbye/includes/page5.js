document.addEventListener("DOMContentLoaded", function() {
        var paragraphs = document.querySelectorAll('.text p');
        var images = document.querySelectorAll('.image img');
        var containerHeight = document.querySelector('.container').clientHeight;
        var numElements = Math.min(paragraphs.length, images.length);
        var threshold = containerHeight / numElements; // Calculate the threshold for revealing each element
    
        // Create a link at the top of the page
        var homeLink = document.createElement("a");
        homeLink.href = "../howToSayGoodbye.html";
        homeLink.textContent = "Home";
        homeLink.style.position = "fixed";
        homeLink.className = "text";
        homeLink.style.top = "20px";
        homeLink.style.left = "20px";
        document.body.appendChild(homeLink);
    
        window.addEventListener('scroll', function() {
            var scrollPosition = window.scrollY;
            
            // Calculate when to show paragraphs and images
            for (var i = 0; i < numElements; i++) {
                if (scrollPosition > threshold * i) {
                    paragraphs[i].classList.remove('hidden');
                    images[i].classList.remove('hidden');
                    if (i > 0) {
                        images[i - 1].classList.add('hidden'); // Hide previous image
                        paragraphs[i - 1].classList.add('hidden');
                    }
                }
            }
        });
        
    });