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

  // Turn the entire array into a neat little array that will be modified as we load the data
  const catanIconNames = Object.keys(cardData).map((key) => {
    return { name: key, dots: cardData[key].dots };
  });

  for (let x = 0; x < 5; x++) {
    const div = document.createElement("div");
    div.className = "catan-row";

    if (x === 0 || x === 4) {
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
    } else if (x === 1 || x === 3) {
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
    } else {
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(images.sand);
      div.appendChild(getRandomHex(catanIconNames.shift()));
      div.appendChild(getRandomHex(catanIconNames.shift()));
    }

    catanBoard.appendChild(div);
  }

  preloadCardImages();
}

async function loadSvgContainer(div, catanIcon) {
  const svgContainer = document.createElement("div");
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

function getRandomHex(catanIcon) {
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
  loadSvgContainer(div, catanIcon);
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
const cardData = {
  FavoriteFood: {
    title: "Food",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 3,
  },
  FavoriteBooks: {
    title: "Books",
    imgUrl: "books.jpg",
    text: "I studied in RIT",
    dots: 1,
  },
  Married: {
    title: "Married",
    imgUrl: "RIT.jpeg", //TODO: Find image
    text: "I studied in RIT",
    dots: 4,
  },
  Traveling: {
    title: "Traveling",
    imgUrl: "traveling.jpg",
    text: "I studied in RIT",
    dots: 1,
  },
  Music: {
    title: "Music",
    imgUrl: "music.jpg",
    text: "Giving that I spent so much time in Music Highschool, I grew very fond of all sorts of music genres.<br/><br/>Favorite genres: Jazz, Classical and Bubblegum Pop",
    dots: 5,
  },
  Dog: {
    title: "Animals",
    imgUrl: "RIT.jpeg", // TODO: Find my own
    text: "Growing up I had a lot of pets. All of these pets were mine. ", // TODO: Not make this depressing
    dots: 3,
  },
  WhoInspiresMe: {
    title: "Who Inspires Me",
    imgUrl: "RIT.jpeg",
    text: "Growing up <b>Tony Stark</b> was my least favorite hero because the main special thing about him was that he was smart. Later on, this became the main reason why he was my favorite Super-Hero of all time.",
    dots: 3,
  },
  Chess: {
    title: "Board Games",
    imgUrl: "boardGames.jpeg",
    text: "I always had a big affinity towards board games, but I couldn't play much of them as a kid because they were so expensive. Recently, however, I got to try some. <br/><br/> Favorite games: Scotland yard, Catan, Ticket to ride",
    dots: 4,
  },
  Languages: {
    title: "Languages",
    imgUrl: "RIT.jpeg",
    text: "I am a bilingual.<br/>My mother is from Ireland and my father is from Croatia, so I always knew <b>English</b> and <b>Croatian</b>.<br/> I tried learning <b>German</b> and <b>Italian</b>, but unfortunately I'm very bad at learning new languages.",
    dots: 2,
  },
  Games: {
    title: "Video Games",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 2,
  },
  RIT: {
    title: "Education",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 5,
  },
  Animation: {
    title: "Animation",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 5,
  },
  Teacher: {
    title: "Teacher",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 2,
  },
  FutureVision: {
    title: "The Future",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 3,
  },
  Running: {
    title: "Sports",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 4,
  },
  Owner: {
    title: "My Restaurant",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 4,
  },
  Linux: {
    title: "Linux",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 5,
  },
  Chef: {
    title: "I love to cook",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 2,
  },
};

setupCatanBoard();
