function readTextFile(file, parentId, numberOfFiles) {
  fetch(`${file}layered-waves-haikei (${0}).svg`)
    .then((response) => response.text())
    .then((response) => addSvgToHTML(response, parentId, 0));

//   for (let x = 0; x < numberOfFiles; x++) {
//     fetch(`${file}layered-waves-haikei (${x}).svg`)
//       .then((response) => response.text())
//       .then((response) => addSvgToHTML(response, parentId, x));
//   }
  // TODO: Implement animations
  //   setTimeout(() => {
  //     const tween = KUTE.fromTo(
  //       `#${parentId}-0-0`,
  //       { path: `#${parentId}-0-0` },
  //       //  { path: `${parentId}-${index}-${3}`, },
  //       //  { path: `${parentId}-${index}-${4}`, },
  //       //  { path: `${parentId}-${index}-${5}`, },
  //       { repeat: 999, duration: 3000, yoyo: true }
  //     );
  //     tween.start();
  //   }, 1000);
}

function addSvgToHTML(response, parentId, index) {
  const parent = document.getElementById(parentId);
  const parser = new DOMParser();
  const paths = [
    ...parser
      .parseFromString(response, "image/svg+xml")
      .getElementsByTagName("path"),
  ];

  for (let x = 0; x < paths.length; x++) {
    const path = paths[x];
    path.id = `${parentId}-${index}-${x}`;
    parent.append(path);
  }
}

readTextFile("/assets/svgs/topWave/", "topWave");
readTextFile("/assets/svgs/interestsTop/", "interestsTop");
readTextFile("/assets/svgs/interestsBottom/", "interestsBottom");
