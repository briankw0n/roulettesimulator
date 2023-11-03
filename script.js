const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spin-button');

const numberElements = wheel.querySelectorAll('.number');
let rotationAngle = 0;

numberElements.forEach((number, i) => {
  const angle = (360 / numberElements.length) * i;
  number.style.transform = `rotate(${angle}deg) translateY(-240px)`;
});

spinButton.addEventListener('click', spinWheel);

const rouletteWheel = {
  0: { color: 'green', degreeRange: [0, 9] },
  32: { color: 'red', degreeRange: [9, 18] },
  15: { color: 'black', degreeRange: [18, 27] },
  19: { color: 'red', degreeRange: [27, 36] },
  4: { color: 'black', degreeRange: [36, 45] },
  21: { color: 'red', degreeRange: [45, 54] },
  2: { color: 'black', degreeRange: [54, 63] },
  25: { color: 'red', degreeRange: [63, 72] },
  17: { color: 'black', degreeRange: [72, 81] },
  34: { color: 'red', degreeRange: [81, 90] },
  6: { color: 'black', degreeRange: [90, 99] },
  27: { color: 'red', degreeRange: [99, 108] },
  13: { color: 'black', degreeRange: [108, 117] },
  36: { color: 'red', degreeRange: [117, 126] },
  11: { color: 'black', degreeRange: [126, 135] },
  30: { color: 'red', degreeRange: [135, 144] },
  8: { color: 'black', degreeRange: [144, 153] },
  23: { color: 'red', degreeRange: [153, 162] },
  10: { color: 'black', degreeRange: [162, 171] },
  5: { color: 'red', degreeRange: [171, 180] },
  24: { color: 'black', degreeRange: [180, 189] },
  16: { color: 'red', degreeRange: [189, 198] },
  33: { color: 'black', degreeRange: [198, 207] },
  1: { color: 'red', degreeRange: [207, 216] },
  20: { color: 'black', degreeRange: [216, 225] },
  14: { color: 'red', degreeRange: [225, 234] },
  31: { color: 'black', degreeRange: [234, 243] },
  9: { color: 'red', degreeRange: [243, 252] },
  22: { color: 'black', degreeRange: [252, 261] },
  18: { color: 'red', degreeRange: [261, 270] },
  29: { color: 'black', degreeRange: [270, 279] },
  7: { color: 'red', degreeRange: [279, 288] },
  28: { color: 'black', degreeRange: [288, 297] },
  12: { color: 'red', degreeRange: [297, 306] },
  35: { color: 'black', degreeRange: [306, 315] },
  3: { color: 'red', degreeRange: [315, 324] },
  26: { color: 'black', degreeRange: [324, 333] },
};

function getRandomDuration(min, max) {
  return Math.random() * (max - min) + min;
}

function findNumberAndColor(degree) {
  let foundNumber;
  let foundColor;

  for (const number in rouletteWheel) {
    const pocket = rouletteWheel[number];
    const degreeRange = pocket.degreeRange;

    if (degree >= degreeRange[0] && degree < degreeRange[1]) {
      foundNumber = number;
      foundColor = pocket.color;
      break;
    }
  }

  return {
    number: foundNumber,
    color: foundColor,
  };
}

function spinWheel() {
  const minDuration = 4;
  const maxDuration = 8;

  const spinDuration = getRandomDuration(minDuration, maxDuration);
  
  let rotationAngle = 360 * spinDuration;
  wheel.style.transform = `rotate(${rotationAngle}deg)`;
  wheel.style.transition = `transform ${spinDuration}s ease-out`;

  console.log(rotationAngle);

  totalRotations = rotationAngle % 360;

  console.log(totalRotations);

  const result = findNumberAndColor(totalRotations);

  console.log('Landed on number: ' + result.number);
  console.log('Landed color: ' + result.color);

  // const minDuration = 4; // Minimum duration in seconds
  // const maxDuration = 8; // Maximum duration in seconds
  // const transitionDuration = getRandomDuration(minDuration, maxDuration);

  // console.log("Duration: ", transitionDuration);

  // rotationAngle = 360 * transitionDuration;

  // console.log("Total Rotation: ", rotationAngle);

  // wheel.style.transition = `transform ${transitionDuration}s ease-out`;
  // wheel.style.transform = `rotate(${rotationAngle}deg)`;

  // const currentRotation = rotationAngle % 360;

  // console.log("Rotation: ", currentRotation);

  // // Ensure that the result is a non-negative angle
  // const normalizedRotation = (currentRotation + 360) % 360;

  // // Initialize variables to store the landed number and color
  // let landedNumber = '';
  // let landedColor = '';

  // // Iterate through the rouletteWheel dictionary
  // for (const number in rouletteWheel) {
  //   if (rouletteWheel.hasOwnProperty(number)) {
  //     const pocket = rouletteWheel[number];
  //     const degreeRange = pocket.degreeRange;

  //     if (normalizedRotation >= degreeRange[0] && normalizedRotation < degreeRange[1]) {
  //       landedNumber = number;
  //       landedColor = pocket.color;
  //       break;
  //     }
  //   }
  // }

  // setTimeout(() => {
  //   console.log('Landed on number: ' + landedNumber);
  //   console.log('Landed color: ' + landedColor);
  // }, transitionDuration * 1000);
}


