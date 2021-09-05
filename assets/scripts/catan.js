const catanBoard = document.getElementById("catan");
const images = {};
const hexTypes = {
  brick: 3,
  ore: 3,
  sheep: 4,
  wheat: 4,
  wood: 4,
};

// Order of dots: 3, 1, 4, 1, 5, 3, 3, 4, 2, 2, 5, 5, 2, 3, 4, 4, 5, 2
const catanIconNames = [
  { name: "FavoriteFood", dots: 3 },
  { name: "FavoriteBooks", dots: 1 },
  { name: "Married", dots: 4 },
  { name: "Traveling", dots: 1 },
  { name: "Music", dots: 5 },
  { name: "Dog", dots: 3 },
  { name: "WhoInspiresMe", dots: 3 },
  { name: "Chess", dots: 4 },
  { name: "Languages", dots: 2 },
  { name: "Games", dots: 2 },
  { name: "RIT", dots: 5 },
  { name: "Animation", dots: 5 },
  { name: "Teacher", dots: 2 },
  { name: "FutureVision", dots: 3 },
  { name: "Running", dots: 4 },
  { name: "Owner", dots: 4 },
  { name: "Linux", dots: 5 },
  { name: "Chef", dots: 2 },
];

function preloadImages() {
  const urls = ["brick", "ore", "sheep", "wheat", "wood", "sand"];
  for (let x = 0; x < urls.length; x++) {
    images[urls[x]] = new Image();
    images[urls[x]].src = `/assets/images/catan/${urls[x]}.png`;
  }
}

function setupCatanBoard() {
  preloadImages();

  for (let x = 0; x < 5; x++) {
    const div = document.createElement("div");
    div.className = "catan-row";

    if (x === 0 || x === 4) {
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
    } else if (x === 1 || x === 3) {
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
    } else {
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
      div.appendChild(images.sand);
      div.appendChild(getRandomHex());
      div.appendChild(getRandomHex());
    }

    catanBoard.appendChild(div);
  }
}

async function loadSvgContainer(div) {
  const svgContainer = document.createElement("div");
  const catanIcon = catanIconNames.shift();
  fetch(`/assets/images/catanIcons/${catanIcon.name}.svg`)
    .then((response) => response.text())
    .then((response) => {
      svgContainer.className = `svg-container ${
        catanIcon.dots === 5 ? "five-dots" : ""
      }`;
      svgContainer.innerHTML =
        response +
        `<span class="dots noselect ">${".".repeat(catanIcon.dots)}</span>`;
      div.appendChild(svgContainer);
      div.onclick = () => showOverlay(catanIcon.name);
    });
}

function getRandomHex() {
  const hexKeys = Object.keys(hexTypes);
  const index = Math.floor(Math.random() * hexKeys.length);
  const key = hexKeys[index];
  if (--hexTypes[key] === 0) {
    delete hexTypes[key];
  }

  const img = new Image();
  img.src = images[key].src;
  const div = document.createElement("div");
  div.appendChild(img);
  loadSvgContainer(div);
  return div;
}

setupCatanBoard();

function showOverlay(iconName) {
  console.log(iconName);
  document.getElementById("overlay").setAttribute("class", "active-overlay");
  document.getElementsByTagName("html")[0].setAttribute("class", "overflow-hidden");
}

function hideOverlay() {
  document.getElementById("overlay").setAttribute("class", "");
  document.getElementsByTagName("html")[0].setAttribute("class", "");
}
