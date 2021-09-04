var section = document.getElementsByTagName("section");
var sections = {};
var i = 0;

Array.prototype.forEach.call(section, function (e) {
  if (e.id != null) sections[e.id] = e.offsetTop;
});

window.onscroll = function () {
  var scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;

  for (i in sections) {
    if (sections[i] <= scrollPosition + 150) {
      document.querySelector(".active")?.setAttribute("class", " ");
      document
        .getElementsByTagName("nav")[0]
        .querySelector(`a[href*="${i}"]`)
        ?.setAttribute("class", "active");
    }
  }
};
