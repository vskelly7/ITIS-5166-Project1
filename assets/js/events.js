events = {
  Educational: [
    "LCES 2050 - Introduction to Linguistic Anthropology",
    "ITIS 5166 - Network Based Application Development",
    "MBAD 6122 - Decison Modeling and Analysis",
  ],
  Recreational: [
    "Fun at Carowinds",
    "Local Brewery Crawl",
    "Farmers Market Meet Up",
  ],
};
document.addEventListener("DOMContentLoaded", () => {
  let content = document.querySelector(".content-wrapper");
  let group = document.createElement("div");
  for (const [key, value] of Object.entries(events)) {
    group.innerHTML += `<h1>${key}</h1>`;
    let list = document.createElement("ul");
    for (const name of value) {
      list.innerHTML += `<li><a href="event.html">${name}</a></li>`;
    }
    group.appendChild(list);
    console.log(key, value);
    content.appendChild(group);
  }
});
