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
  img.setAttribute("draggable", false);
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
    cardData.img?.setAttribute("draggable", false);
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
  Music: {
    title: "Music",
    imgUrl: "music.jpg",
    text: "Giving that I spent so much time in Music Highschool, I grew very fond of all sorts of music genres.<br/><br/>Favorite genres: Jazz, Classical and Bubblegum Pop",
    dots: 3,
  },
  Chess: {
    title: "Board Games",
    imgUrl: "boardGames.jpeg",
    text: "I always had a big affinity towards board games, but I couldn't play much of them as a kid because they were so expensive. Recently, however, I got to try some. <br/><br/> Favorite games: Scotland yard, Catan, Ticket to ride",
    dots: 1,
  },
  Married: {
    title: "Married",
    imgUrl: "married.jpeg",
    text: "Together 6 years and counting, she was my motivation to work so hard and get to where I am today.",
    dots: 4,
  },
  Traveling: {
    title: "Traveling",
    imgUrl: "traveling.jpg",
    text: "Whether on a beach or hiking up a mountain - I love exploring the world and learning about new cultures.",
    dots: 1,
  },
  React: {
    title: "React",
    imgUrl: "music.jpg",
    text: "...",
    dots: 5,
  },
  Dog: {
    title: "Animals",
    imgUrl: "dogs.jpg",
    text: "Growing up I had a lot of pets. I still have the same love for pets and loving spending time with my dog.",
    dots: 3,
  },
  WhoInspiresMe: {
    title: "Who Inspires Me",
    imgUrl: "tonystark.jpg",
    text: "Growing up <b>Tony Stark</b> was my least favorite hero because the main special thing about him was that he was smart. Later on, this became the main reason why he was my favorite Super-Hero of all time.",
    dots: 3,
  },
  Animation: {
    title: "Animation",
    // TODO: Image for this
    imgUrl: "RIT.jpeg",
    text: "I started animating at a young age. While I don't have my time to do it now, I still find it fascinating and would love to take it up as a more serious hobby in the near future.",
    dots: 4,
  },
  Languages: {
    title: "Languages",
    imgUrl: "languages.jpg",
    text: "I am a bilingual.<br/>My mother is from Ireland and my father is from Croatia, so I always knew <b>English</b> and <b>Croatian</b>.<br/> I tried learning <b>German</b> and <b>Italian</b>, but unfortunately I'm very bad at learning new languages.",
    dots: 2,
  },
  Games: {
    title: "Video Games",
    imgUrl: "videogames.jpg",
    text: "I guess this was an obvious one. I enjoy playing many different video games and I believe the best times I have is when playing with friends.",
    dots: 2,
  },
  Node: {
    title: "Node.js",
    imgUrl: "RIT.jpeg",
    text: "...",
    dots: 5,
  },
  Flutter: {
    title: "Flutter",
    // TODO: Image for this
    imgUrl: "RIT.jpeg",
    text: "...",
    dots: 5,
  },
  Running: {
    title: "Sports",
    imgUrl: "running.jpg",
    text: "I love running every morning/evening. For me, it's a great way to relax and I believe Maxi (my dog) enjoys it too!",
    dots: 2,
  },
  FutureVision: {
    title: "The Future",
    imgUrl: "RIT.jpeg",
    text: "I studied in RIT",
    dots: 3,
  },
  RIT: {
    title: "Education",
    imgUrl: "RIT.jpeg",
    text: "I studied at RIT and am on track to graduate with honors in the next few months. I was a teaching assisstant for multiple subjects and students would always come to me if they were stuck and needed something explained.",
    dots: 4,
  },
  Owner: {
    title: "My Restaurant",
    imgUrl: "viktors.jpg",
    text: "While I was living in Bosnia and Hercegovina I co-owned a restaurant. I also waitered there during tourist season over the summer. It was a challenging job, but I learnt a lot.",
    dots: 4,
  },
  Linux: {
    title: "Linux",
    imgUrl: "linux.jpg",
    text: "Since using Flutter my main OS is now MacOS. However, Linux was what I used before as my main OS for several years.",
    dots: 5,
  },
  Chef: {
    title: "I love to cook",
    imgUrl: "food.jpg",
    text: "I love trying new food and learning new recipes. <br/>My most recent food passion? Ramen!",
    dots: 2,
  },
};

setupCatanBoard();
