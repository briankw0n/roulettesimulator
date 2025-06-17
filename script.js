const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const restartBtn = document.getElementById("restartBtn");
const betColorSelect = document.getElementById("betColor");
const betAmountInput = document.getElementById("betAmount");
const moneyDisplay = document.getElementById("moneyDisplay");
const resultDisplay = document.getElementById("result");

const numbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const redNumbers = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
const blackNumbers = new Set([
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
]);

const segmentAngle = (2 * Math.PI) / numbers.length;
const pointerAngle = (3 * Math.PI) / 2;

let currentAngle = 0;
let spinning = false;
let money = 100;

function resizeCanvas() {
  const maxSize = Math.min(window.innerWidth * 0.9, 400);
  canvas.width = maxSize;
  canvas.height = maxSize;
  drawWheel();
}

window.addEventListener("resize", resizeCanvas);

function drawWheel() {
  const radius = canvas.width / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(currentAngle + pointerAngle - segmentAngle / 2);

  numbers.forEach((num, i) => {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    let fillStyle = "black";
    if (num === 0) fillStyle = "green";
    else if (redNumbers.has(num)) fillStyle = "red";

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius - 10, startAngle, endAngle, false);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = `${radius / 12}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textRadius = radius - 40;
    const angle = startAngle + segmentAngle / 2;
    const x = textRadius * Math.cos(angle);
    const y = textRadius * Math.sin(angle);

    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(num.toString(), 0, 0);
    ctx.restore();
  });

  ctx.restore();
}

function spinWheel() {
  if (spinning) return;
  const betAmount = parseInt(betAmountInput.value, 10);
  if (isNaN(betAmount) || betAmount < 1) {
    alert("Enter a valid bet amount (>=1)");
    return;
  }
  if (betAmount > money) {
    alert("You don't have enough money for that bet!");
    return;
  }

  spinning = true;
  spinBtn.disabled = true;
  betColorSelect.disabled = true;
  betAmountInput.disabled = true;
  resultDisplay.textContent = "";

  const rotations = Math.floor(Math.random() * 6) + 7;
  const randomSegment = Math.floor(Math.random() * numbers.length);

  const finalAngle = rotations * 2 * Math.PI - randomSegment * segmentAngle;

  const duration = 10000;
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    if (elapsed >= duration) {
      currentAngle = finalAngle % (2 * Math.PI);
      drawWheel();
      spinning = false;
      spinBtn.disabled = false;
      betColorSelect.disabled = false;
      betAmountInput.disabled = false;

      const winningNumber = numbers[randomSegment];
      showResult(winningNumber, betAmount);
      return;
    }

    const t = elapsed / duration;
    const easeOut = 1 - Math.pow(1 - t, 3);
    currentAngle = easeOut * finalAngle;
    drawWheel();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function showResult(number, betAmount) {
  let colorWon = null;
  if (number === 0) colorWon = "green";
  else if (redNumbers.has(number)) colorWon = "red";
  else colorWon = "black";

  const betColor = betColorSelect.value;
  if (colorWon === betColor) {
    money += betAmount;
    resultDisplay.textContent = `You won! Number: ${number} (${colorWon}) +$${betAmount}`;
  } else {
    money -= betAmount;
    resultDisplay.textContent = `You lost! Number: ${number} (${colorWon}) -$${betAmount}`;
  }

  updateMoney();

  if (money <= 0) {
    resultDisplay.textContent += " Game over! You ran out of money.";
    spinBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    betColorSelect.disabled = true;
    betAmountInput.disabled = true;
  }
}

function updateMoney() {
  moneyDisplay.textContent = `Money: $${money}`;
}

spinBtn.addEventListener("click", spinWheel);

restartBtn.addEventListener("click", () => {
  money = 100;
  currentAngle = 0;
  updateMoney();
  resultDisplay.textContent = "";
  spinBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  betColorSelect.disabled = false;
  betAmountInput.disabled = false;
  drawWheel();
});

updateMoney();
resizeCanvas();
drawWheel();
