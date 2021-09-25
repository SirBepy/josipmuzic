const snackbar = document.getElementById("snackbar");

function hideSnackbar() {
  snackbar.className = snackbar.className.replace("show", "");
}

function showSnackbar(msg) {
  snackbar.innerText = msg;
  snackbar.className = "show";
  setTimeout(hideSnackbar, 3000);
}

function copyMail() {
  navigator.clipboard.writeText("josipmuzic99@gmail.com");
  showSnackbar(msg);
}
