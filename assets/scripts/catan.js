//* Functions setting everything up
function preloadCatanImages() {
  const urls = ["brick", "ore", "sheep", "wheat", "wood", "sand"];
  for (let x = 0; x < urls.length; x++) {
    images[urls[x]] = new Image();
    images[urls[x]].src = `/assets/images/catan/${urls[x]}.png`;
    images[urls[x]].alt = "A catan board piece of " + urls[x];
  }
}

function setupCatanBoard() {
  preloadCatanImages();

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

  preloadCardImages();
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

//* Preloading the cards
function preloadCardImages() {
  const cardDataKeys = Object.keys(cardData);
  for (const index in cardDataKeys) {
    const cardKey = cardDataKeys[index];
    cardData[cardKey].img = new Image();
    cardData[
      cardKey
    ].img.src = `/assets/images/catanCardImages/${cardData[cardKey].imgUrl}`;
    cardData[
      cardKey
    ].img.alt = `An image representing ${cardData[cardKey].title}`;
  }
}

//* Functions regarding pressing on the card
function hideOverlay() {
  document.getElementById("overlay").setAttribute("class", "");
  document.getElementsByTagName("html")[0].setAttribute("class", "");
}

function showOverlay(iconName) {
  const { title, img, imgUrl, text } = cardData[iconName];
  document.getElementById("overlay").setAttribute("class", "active-overlay");
  document
    .getElementsByTagName("html")[0]
    .setAttribute("class", "overflow-hidden");

  document.getElementById("card-head").getElementsByTagName("p")[0].innerText =
    title;
  document
    .getElementById("card-body")
    .getElementsByTagName("div")[0].innerHTML = text;

  document
    .getElementById("card-image")
    .getElementsByTagName("img")[0]
    ?.remove();
  if (!img)
    document.getElementById(
      "card-image"
    ).innerHTML = `<img src="/assets/images/catanCardImages/${imgUrl}" alt=""/>`;
  else document.getElementById("card-image").appendChild(img);
}

//* Variables that will be used throughout the script
const catanBoard = document.getElementById("catan");
const images = {};
const hexTypes = {
  brick: 3,
  ore: 3,
  sheep: 4,
  wheat: 4,
  wood: 4,
};

// Order of dots needs to remain as: 3, 1, 4, 1, 5, 3, 3, 4, 2, 2, 5, 5, 2, 3, 4, 4, 5, 2
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

const cardData = {
  FavoriteFood: {
    title: "Food",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  FavoriteBooks: {
    title: "Books",
    imgUrl: "books.jpg",
    text: "I studied in RIT",
  },
  Married: {
    title: "Married",
    imgUrl: "RIT.jpeg", //TODO: Find image
    text: "I studied in RIT",
  },
  Traveling: {
    title: "Traveling",
    imgUrl: "traveling.jpg",
    text: "I studied in RIT",
  },
  Music: {
    title: "Music",
    imgUrl: "music.jpg",
    text: "Giving that I spent so much time in Music Highschool, I grew very fond of all sorts of music genres.<br/><br/>Favorite genres: Jazz, Classical and Bubblegum Pop",
  },
  Dog: {
    title: "Animals",
    imgUrl: "RIT.jpeg", // TODO: Find my own
    text: "Growing up I had a lot of pets. All of these pets were mine. ", // TODO: Not make this depressing
  },
  WhoInspiresMe: {
    title: "Who Inspires Me",
    imgUrl: "RIT.jpeg",
    text: "Growing up <b>Tony Stark</b> was my least favorite hero because the main special thing about him was that he was smart. Later on, this became the main reason why he was my favorite Super-Hero of all time.",
  },
  Chess: {
    title: "Board Games",
    imgUrl: "boardGames.jpeg",
    text: "I always had a big affinity towards board games, but I couldn't play much of them as a kid because they were so expensive. Recently, however, I got to try some. <br/><br/> Favorite games: Scotland yard, Catan, Ticket to ride",
  },
  Languages: {
    title: "Languages",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Games: {
    title: "Video Games",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  RIT: {
    title: "Education",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Animation: {
    title: "Animation",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Teacher: {
    title: "Teacher",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  FutureVision: {
    title: "The Future",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Running: {
    title: "Sports",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Owner: {
    title: "My Restaurant",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Linux: {
    title: "Linux",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
  Chef: {
    title: "I love to cook",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
  },
};

setupCatanBoard();
