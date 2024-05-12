// Set the target date
const targetDate = new Date('2024-05-12T20:23:00').getTime();

// Function to display fireworks
function fireworks() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 400;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      speed: Math.random() * 5 + 1,
      angle: Math.random() * Math.PI * 2,
      size: Math.random() * 3 + 1,
      colors: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      const trailLength = particle.size * 2;
      ctx.fillStyle = particle.colors;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      particle.size -= 0.05;

      if (particle.size <= 0) {
        particles.splice(index, 1);
      }
    });

    if (particles.length <= 0) {
      cancelAnimationFrame(animation);
      document.body.removeChild(canvas);
    } else {
      requestAnimationFrame(draw);
    }
  }

  const animation = requestAnimationFrame(draw);
}

// Update the countdown every second
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
    timerDisplay.innerHTML = "Happy Monthsary Bam, I Love You";
    fireworks(); // Display fireworks when timer reaches zero
  }
}, 1000);
