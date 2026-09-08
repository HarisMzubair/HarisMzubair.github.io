const requestedPage = document.body.dataset.page;

fetch("index.html")
  .then((response) => response.text())
  .then((html) => {
    const source = new DOMParser().parseFromString(html, "text/html");
    const shell = source.querySelector(".desktop");
    document.body.replaceChildren(shell);
    document.body.dataset.page = requestedPage;

    const contentScript = document.createElement("script");
    contentScript.src = "content.js";
    contentScript.addEventListener("load", () => {
      const appScript = document.createElement("script");
      appScript.src = "app.js";
      document.body.append(appScript);
    });
    document.body.append(contentScript);
  });