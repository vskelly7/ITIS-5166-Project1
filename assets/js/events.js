events = {
  Educational: [],
  Recreational: [],
  Travel: [],
};
document.addEventListener("DOMContentLoaded", () => {
  let content = document.querySelector(".content-wrapper");
  for (const [key, value] of Object.entries(events)) {
    content.innerHTML += `<h1>${key}</h1>`;
    for (const name of events[key]) {
      content.innerHTML += `<a href="event.html">${name}</a>`;
    }
    console.log(key, value);
  }
});
