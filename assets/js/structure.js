document.addEventListener("DOMContentLoaded", () => {
  fetch("../assets/js/template.json")
    .then((res) => res.json())
    .then((json) => {
      // add logo
      let logo = `<img src=${json.logo.src} alt=${json.logo.alt}/>`;
      document.getElementById("logo").innerHTML = logo;

      // Navigation bar
      const path = window.location.pathname;
      const page = path.split("/").pop();

      let links = document.createElement("ul");
      for (const el of json.nav) {
        let link = `
          <li>
            <a href=${el.ref} 
            ${page === el.ref ? "class=active" : ""}>
            ${el.label}
            </a>
          </li>`;
        links.innerHTML += link;
      }
      document.getElementById("navigation").appendChild(links);
    });
});
