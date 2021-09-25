async function onFormSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("my-form-status");
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
        // TODO: Add success handler
      form.reset();
    })
    .catch((error) => {
        // TODO: Add fail handler
    });
}

const form = document.getElementById("contact-form");
form.addEventListener("submit", onFormSubmit);
