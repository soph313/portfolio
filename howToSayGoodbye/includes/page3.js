document.addEventListener("DOMContentLoaded", function() {
    var paragraphs = document.querySelectorAll('.text p');
    var images = document.querySelectorAll('.image img');
    var containerHeight = document.querySelector('.container').clientHeight;
    var numElements = Math.min(paragraphs.length, images.length);
    var threshold = containerHeight / numElements; // Calculate the threshold for revealing each element

    // Create a link at the top of the page
    var homeLink = document.createElement("a");
    homeLink.href = "../howToSayGoodbye.html";
    homeLink.className = "text"
    homeLink.textContent = "Home";
    homeLink.style.position = "fixed";
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

        // Check if at the last content section
        if (scrollPosition > threshold * (numElements - 1)) {
            // Add button if not already added
            if (!document.querySelector('#clicker')) {
                makeButton();
            }
        }
    });

    function makeButton() {
        const newButton = document.createElement("button");
        const theLink = document.createElement("a");
        theLink.id = "linker";
        newButton.id = "clicker";
        theLink.href = "/includes/healing.html";
        document.body.appendChild(theLink);
        newButton.innerHTML = "Continue";
        newButton.className = "prevent-select text";
        newButton.style.position = "fixed";
        document.getElementById("linker").appendChild(newButton);
    }
});