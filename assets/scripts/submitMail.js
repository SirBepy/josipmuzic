async function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      showSnackbar("Sent successfully")
      form.reset();
    })
    .catch((error) => {
      showSnackbar("Something went wrong, please try again later")
    });
}

const form = document.getElementById("contact-form");
form.addEventListener("submit", onFormSubmit);
