const canvas = document.getElementById("Matrix");
console.log("🚀 ~ canvas:", canvas)
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

// Initialize raindrops
for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
}

const draw = () => {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#0F0";
  context.font = fontSize + "px monospace";

  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
};

let opacity = 1;

// Function to fade out the screen
const fadeOut = () => {
  if (opacity > 0) {
    opacity -= 0.01; // Reduce opacity gradually
    context.fillStyle = `rgba(0, 0, 0, ${1 - opacity})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(fadeOut);
  } else {
    // Show the typewriter effect when fade is complete
    document.querySelector(".typewriter-container").style.display = "flex";
    document.getElementById("Matrix").style.display = "none";
  }
};

// Start the animation
const intervalId = setInterval(draw, 30);

// Stop the animation and start fading out after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  fadeOut(); // Start the fade-out effect
}, 6000);
