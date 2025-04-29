let flipped = [];
let matches = 0;
let attemptsStressed = 0;
let attemptsNuetral = 0;

function showScreen(id) {
  // hide all screens and show the target screen
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  // show the target screen
  const targetScreen = document.getElementById(id);

  // add active class for CSS transitions
  targetScreen.style.display = 'flex';

  // animate the target screen
  gsap.fromTo(targetScreen, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 0.8, ease: "power2.out"});
}


// show the intro screen on page load
document.addEventListener('DOMContentLoaded', () => {
  showScreen('introScreen');
});

// add event listeners to buttons
document.addEventListener('mousemove', (e) => {
  // move pupils based on mouse position
  document.querySelectorAll('.pupil').forEach(pupil => {
    const rect = pupil.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    const distance = Math.min(10, Math.hypot(x, y)); // pupil only moves max 10px
    pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
  });
});


// start baseline task
function startBaseline() {
  // shows the baseline task screen
  showScreen('baselineTask');

  // create grid for baseline task
  createGrid('baselineGrid', ['Dog', 'Cat', 'Pen', 'Book', 'Tree', 'Moose','Shoe','Hair']);  // Neutral words
}

// create grid for memory games
function createGrid(gridId, words) {

  // create grid for memory game
  const grid = document.getElementById(gridId);

  // shuffle words and create cards
  const shuffled = shuffle([...words, ...words]);

  // clear previous cards
  grid.innerHTML = '';

  // create cards
  shuffled.forEach(word => {
    const card = document.createElement('div');
    card.className = 'card hidden';
    card.dataset.word = word;
    card.innerText = word;

    // add click event to flip card
    card.onclick = () => flipCard(gridId, card);

    // append card to grid
    grid.appendChild(card);
  });
}

// shuffle function to randomize the order of the words
// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// flip card function
// flips the card and checks for matches
function flipCard(gridId, card) {

  // check if card is already flipped
  if (flipped.length < 2 && card.classList.contains('hidden')) {

    // flip the card
    card.classList.remove('hidden');

    // add card to flipped array
    flipped.push(card);

    // check if two cards are flipped
    if (flipped.length === 2) {
      setTimeout(() => {
        // check for match
        if (flipped[0].dataset.word === flipped[1].dataset.word) {
          flipped.forEach(c => c.style.background = '#90ee90'); // green for match
          matches++;

          // updates the attempts count
          if (gridId === 'baselineGrid') {
            attemptsNuetral++;
          } else {
            attemptsStressed++;
          }
        } else {

          // no match, flip back
          flipped.forEach(c => c.classList.add('hidden'));

          // updates the attempts count
          if (gridId === 'baselineGrid') {
            attemptsNuetral++;
          } else {
            attemptsStressed++;
          }
        }

        // reset flipped array
        flipped = [];

        // check if all pairs are matched
        // matches variable should be equal to half the number of cards
        const totalPairs = 8; 
        if (matches === totalPairs) {
          // show the next screen
          if (gridId === 'baselineGrid') {
            showScreen('baselineAnxietyRating');
          } else {
            // stop stress effects
            document.getElementById('stressMusic').pause();
              
            // stop distractions and heart animation
            // document.getElementById('distractionContainer').style.display = 'none';
            // document.getElementById('fakeHeart').style.display = 'none';

            showScreen('stressAnxietyRating');
          }
          matches = 0; // reset for next game
        }
      }, 700);
    }
  }
}

// start the stress task
function startStressTask() {
  showScreen('stressTask');

  // create grid for stress task
  createGrid('stressGrid', ['Fear', 'Judge', 'Fail', 'Shame', 'Panic', 'Alone', 'Sweat', 'Error']); 

  startStressEffects();

  // play stress music
  document.getElementById('stressMusic').play();
}

function startStressEffects() {
  // show distractions and fake heart
  document.getElementById('distractionContainer').style.display = 'block';
  document.getElementById('fakeHeart').style.display = 'block';

  // animate distractions and heart
  simulateDistractions();
  animateHeart();

  // start background color change
  // startBackgroundColorChange();
}

// function startBackgroundColorChange() {
//   // changes the background color every 0.8 seconds
//   const colors = ['#ff9999', '#ffcc99', '#99ccff', '#cc99ff', '#ffff99'];
//   setInterval(() => {
//     document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
//   }, 800); 
// }

// simulate distractions, every 2.5 seconds text changes
function simulateDistractions() {
  const distractionTexts = [
    "Everyone is watching...",
    "Don't mess up!",
    "Are you sweating?",
    "Focus! They're judging you.",
    "You’re under pressure!"
  ];

  // changes the distraction text every 2.5 seconds
  setInterval(() => {
    const randomText = distractionTexts[Math.floor(Math.random() * distractionTexts.length)];
    document.getElementById('distractionContainer').innerText = randomText;
  }, 2500);
}

// anxiety ratings
let baselineAnxiety = 0;
let stressAnxiety = 0;

// record baseline anxiety
function recordBaselineAnxiety(level) {
  baselineAnxiety = level;

  showScreen('baselineReflection');
}

// animate the fake heart
function animateHeart() {
  gsap.to("#fakeHeart", {
    scale: 1.6, 
    repeat: -1, 
    yoyo: true, 
    duration: 0.5, 
    ease: "power1.inOut"
  });
}

// record stress anxiety
function recordStressAnxiety(level) {
  
  stressAnxiety = level;
  showScreen('stressReflection');

}

// show the thank you screen
function showSummary() {
  showScreen('thankYouScreen');

  // display the results
  document.getElementById('resultAttempts').innerText = `Neutral Attempts: ${attemptsNuetral} | Stress Attempts: ${attemptsStressed}`;
  document.getElementById('resultAnxiety').innerText = `Anxiety Ratings - Neutral: ${baselineAnxiety}, Stress: ${stressAnxiety}`;

  // create the chart
  const ctx = document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Neutral Attempts', 'Stress Attempts', 'Neutral Anxiety', 'Stress Anxiety'],
      datasets: [{
        label: 'Your Performance',
        data: [attemptsNuetral, attemptsStressed, baselineAnxiety, stressAnxiety],
        backgroundColor: ['#4CAF50', '#f44336', '#2196F3', '#ff9800']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}