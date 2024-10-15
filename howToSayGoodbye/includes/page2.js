window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
var backgroundAudio = document.getElementById("backgroundAudio");
var isAudioPlaying = false;
backgroundAudio.currentTime = 0;

function toggleAudio() {
    if (isAudioPlaying) {
        backgroundAudio.pause();
        isAudioPlaying = false;
    } else {
        backgroundAudio.play();
        isAudioPlaying = true;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // window.addEventListener('load', function() {
    //     window.scroll({
    //         top: 0,
    //         behavior: 'auto' // You can change this to 'auto' if you prefer immediate scrolling
    //     });
    // });
    var paragraphs = document.querySelectorAll('.text p');
    var images = document.querySelectorAll('.image img');
    var containerHeight = document.querySelector('.container').clientHeight;
    var numElements = Math.min(paragraphs.length, images.length);
    var threshold = containerHeight / numElements; // Calculate the threshold for revealing each element

    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY;
        
        for (var i = 0; i < numElements; i++) {
            if (scrollPosition > threshold * i) {
                paragraphs[i].classList.remove('hidden');
                images[i].classList.remove('hidden');
                if (i < numElements - 1) {
                    paragraphs[i + 1].classList.add('hidden');
                    images[i + 1].classList.add('hidden');
                }
                
                if (i > 0) {
                    images[i - 1].classList.add('hidden'); 
                    paragraphs[i - 1].classList.add('hidden');
                }
            }
        }

    });
});
