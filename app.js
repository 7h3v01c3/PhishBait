// Ensure the DOM is fully loaded before executing
document.addEventListener("DOMContentLoaded", () => {
  loadGeneralText(); // Load general site text
  loadTimerText();   // Load timer-related copy
});

// Fade-in Logo Animation
gsap.from(".logo", { duration: 1, y: -50, opacity: 0, ease: "bounce" });

// Hover Effect for Quiz Button
const quizButton = document.querySelector(".start-quiz-btn");
quizButton.addEventListener("mouseenter", () => {
  gsap.to(quizButton, { scale: 1.1, duration: 0.2 });
});
quizButton.addEventListener("mouseleave", () => {
  gsap.to(quizButton, { scale: 1.0, duration: 0.2 });
});

// Create Bouncing Animation for Logo with Control
const logoBounce = gsap.to(".logo", {
  y: 10,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power1.inOut",
});

// Start Quiz and Stop Bouncing Animation
quizButton.addEventListener("click", () => {
  gsap.to(".hero", { opacity: 0, duration: 0.5, onComplete: startQuiz });
});

function startQuiz() {
  console.log("Starting the quiz...");

  // Stop the logo bounce animation and reset logo position
  logoBounce.kill();
  gsap.set(".logo", { clearProps: "transform" });

  // Hide the hero section and show the quiz container
  document.querySelector('.hero').style.display = 'none';
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.style.display = 'block';

  // Fetch questions from YAML and start the quiz
  fetch('data/questions.yaml')
    .then((response) => response.text())
    .then((yamlText) => {
      const questions = jsyaml.load(yamlText).questions;
      startQuizWithQuestions(questions);
    })
    .catch((error) => {
      console.error('Error loading questions:', error);
      quizContainer.innerHTML = `
        <div class="error">Oops! Something went wrong loading the quiz. Please try again later.</div>
      `;
    });
}

// Utility: shuffle an array (Fisher–Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuizWithQuestions(questions) {
  const MAX_QUESTIONS = 20;
  const LOW_TIME_THRESHOLD = 30; // seconds remaining when we start nudging
  const EXTRA_SECONDS = 60; // 1 extra minute
  const GRACE_SECONDS = 20; // final grace countdown before auto-finish

  // Always randomize order; if there are more than MAX_QUESTIONS, pick a random subset
  let quizQuestions = shuffleArray(questions);
  if (quizQuestions.length > MAX_QUESTIONS) {
    quizQuestions = quizQuestions.slice(0, MAX_QUESTIONS);
  }

  // For each question, randomize the order of the options safely
  quizQuestions = quizQuestions.map((q) => {
    const optionObjects = q.options.map((text, index) => ({
      text,
      isCorrect: index === q.correct,
    }));

    const shuffledOptions = shuffleArray(optionObjects);

    return {
      ...q,
      options: shuffledOptions.map((o) => o.text),
      correct: shuffledOptions.findIndex((o) => o.isCorrect),
    };
  });

  let currentQuestion = 0;
  let timer = 300; // 5 minutes in seconds
  // let timer = 20; // testing purposes
  let score = 0; // Track total score
  let inGracePeriod = false;

  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
    <div class="timer-area">
      <div class="quiz-timer">Time Left: 5:00</div>
      <div class="extra-time-container" style="display:none;">
        <span class="extra-time-text"></span>
        <button class="extra-time-btn">+1 minute</button>
      </div>
      <div class="grace-message"></div>
    </div>
    <div class="question-container"></div>
  `;

  const quizTimerEl = document.querySelector('.quiz-timer');
  const extraTimeContainer = document.querySelector('.extra-time-container');
  const extraTimeTextEl = document.querySelector('.extra-time-text');
  const extraTimeBtn = document.querySelector('.extra-time-btn');
  const graceMessageEl = document.querySelector('.grace-message');

  // If timer text is loaded, set the low-time hint text from timer.yaml; otherwise use fallback
  const timerData = window.phishbaitTimer;
  if (timerData?.low_hints && timerData.low_hints.length > 0) {
    const hints = timerData.low_hints;
    extraTimeTextEl.textContent = hints[Math.floor(Math.random() * hints.length)];
  } else {
    extraTimeTextEl.textContent = "Running low on time? You get one mercy minute.";
  }

  // Extra time button behavior
  extraTimeBtn.addEventListener('click', () => {
    timer += EXTRA_SECONDS;
    extraTimeContainer.style.display = 'none';
    // Light-hearted nudge to keep going
    let bonusMsg = "Bonus minute activated. Real scammers aren't this kind.";
    if (timerData?.bonus_messages && timerData.bonus_messages.length > 0) {
      const msgs = timerData.bonus_messages;
      bonusMsg = msgs[Math.floor(Math.random() * msgs.length)];
    }
    graceMessageEl.textContent = bonusMsg;
    // Auto-clear this bonus message after a few seconds (unless we're in final grace)
    setTimeout(() => {
      if (!inGracePeriod) {
        graceMessageEl.textContent = "";
      }
    }, 4000);
  });

  // Start countdown
  const timerInterval = setInterval(() => {
    timer--;
    if (timer < 0) timer = 0;

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    quizTimerEl.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // When time is running low and we're not in the final grace period, offer more time
    if (!inGracePeriod && timer > 0 && timer <= LOW_TIME_THRESHOLD) {
      extraTimeContainer.style.display = 'flex';
    }

    // Handle main timer hitting zero
    if (timer <= 0) {
      if (!inGracePeriod) {
        // Switch to a short grace period instead of ending immediately
        inGracePeriod = true;
        timer = GRACE_SECONDS;
        extraTimeContainer.style.display = 'none';
        let graceMsg = "Time's basically up. We'll score this in 20 seconds—no pressure, just do your best click-panic.";
        if (timerData?.grace_messages && timerData.grace_messages.length > 0) {
          const msgs = timerData.grace_messages;
          graceMsg = msgs[Math.floor(Math.random() * msgs.length)];
        }
        graceMessageEl.textContent = graceMsg;
      } else {
        clearInterval(timerInterval);
        endQuiz();
      }
    }
  }, 1000);

  renderQuestion(quizQuestions[currentQuestion]);

  function renderQuestion(question) {
    const questionContainer = document.querySelector('.question-container');
    
    // Fade out current question
    gsap.to(questionContainer, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            // Update question content
            questionContainer.innerHTML = `
                <div class="question">${question.text}</div>
                <div class="options">
                    ${question.options
                        .map((option, index) => `<button class="option" data-index="${index}">${option}</button>`)
                        .join('')}
                </div>
            `;
            
            // Fade in new question
            gsap.to(questionContainer, {
                opacity: 1,
                duration: 0.3
            });
            
            // Attach event listeners to options
            document.querySelectorAll('.option').forEach((button) => {
              button.addEventListener('click', (e) => {
                const selectedIndex = parseInt(e.target.dataset.index);
                if (selectedIndex === question.correct) {
                  score += question.weight; // Add weight if correct
                }

                handleAnswer(button, selectedIndex === question.correct);
              });
            });
        }
    });
  }

  function handleAnswer(button, isCorrect) {
    // Disable all buttons
    document.querySelectorAll('.option').forEach(btn => {
        btn.disabled = true;
    });
    
    // Add visual feedback
    button.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Wait before moving to next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            renderQuestion(quizQuestions[currentQuestion]);
        } else {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
  }

  function endQuiz() {
    // Calculate total score and percentage
    const maxScore = quizQuestions.reduce((sum, q) => sum + q.weight, 0);
    const scorePercentage = Math.round((score / maxScore) * 100);

    // Determine category based on score
    let resultMessage = '';
    if (scorePercentage >= 90) {
      resultMessage = "Blockchain Genius";
    } else if (scorePercentage >= 70) {
      resultMessage = "Crypto Catastrophe Avoidance Expert";
    } else if (scorePercentage >= 50) {
      resultMessage = "Still Learning, But Safer";
    } else {
      resultMessage = "Future Rug Pull Enthusiast";
    }

    // Display results
    quizContainer.innerHTML = `
      <div class="final-results">
        <h1>Your Results</h1>
        <p>Total Score: ${score} / ${maxScore}</p>
        <p>Percentage: ${scorePercentage}%</p>
        <p>Category: <strong>${resultMessage}</strong></p>
        <button class="restart-quiz">Restart Quiz</button>
      </div>
    `;

    document.querySelector('.restart-quiz').addEventListener('click', () => {
      location.reload(); // Restart the quiz
    });
  }

  function updateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (currentQuestion / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
}


// Fade-in Animation for Sections
gsap.from(".hero, .callouts, .footer", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  stagger: 0.2,
  ease: "power2.out",
});

// Smooth Scrolling for Internal Links (only hrefs that start with '#')
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetSelector = this.getAttribute("href");
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

function loadGeneralText() {
  // Fetch the general UI text YAML
  fetch('data/general_text.yaml')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load phrases.yaml: ${response.statusText}`);
      }
      return response.text(); // Return the raw YAML text
    })
    .then((yamlText) => {
      // Parse YAML content
      const generalText = jsyaml.load(yamlText).general_text;
      // Expose text globally for other features if needed
      window.phishbaitText = generalText;

      // Dynamically update content in the HTML
      if (generalText) {
        document.querySelector('.tagline').textContent = generalText.tagline || "Tagline not found!";
        document.querySelectorAll('.disclaimer')[0].textContent = generalText.warning || "Warning not found!";
        document.querySelectorAll('.disclaimer')[1].textContent = generalText.encouragement || "Encouragement not found!";
        document.querySelector('.share-quiz-link').textContent = generalText.share || "Share link not found!";
      } else {
        console.error("Phrases object is empty or undefined.");
      }
    })
    .catch((error) => {
      console.error('Error loading phrases:', error);
      document.querySelector('.quiz-container').innerHTML = `
        <div class="error">Oops! Something went wrong loading the phrases. Please try again later.</div>
      `;
    });
}

function loadTimerText() {
  // Fetch the timer-specific text YAML
  fetch('data/timer.yaml')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load timer.yaml: ${response.statusText}`);
      }
      return response.text();
    })
    .then((yamlText) => {
      const timerData = jsyaml.load(yamlText).timer;
      window.phishbaitTimer = timerData;
    })
    .catch((error) => {
      console.error('Error loading timer text:', error);
      // We fall back to hard-coded strings in startQuizWithQuestions if this fails
    });
}


