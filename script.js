// Set the target date
const targetDate = new Date('2024-05-13T00:00:00').getTime();

// Update the countdown and progress every second
const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Calculate progress
  const totalTime = targetDate - new Date('2024-04-13T00:00:00').getTime();
  const elapsedTime = totalTime - distance;
  const progress = (elapsedTime / totalTime) * 100;

  // Update progress bar
  const progressBar = document.getElementById('progress');
  progressBar.style.width = progress + '%';

  // Calculate days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  const timerDisplay = document.getElementById('timer');
  if (distance > 0) {
    timerDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    clearInterval(timer);
    timerDisplay.innerHTML = "Happy Monthsary Bam, I Love You!";
  }
}, 1000);
