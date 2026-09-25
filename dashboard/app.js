async function loadStats() {

  const res = await fetch("/stats");

  const data = await res.json();

  document.getElementById("articles").textContent = data.articles;
  document.getElementById("books").textContent = data.books;
  document.getElementById("pages").textContent = data.pages;
  document.getElementById("score").textContent = data.score;

}

loadStats();

async function run(action) {

  const out = document.getElementById("output");

  out.textContent = "Menjalankan...";

  const res = await fetch("/run/" + action, {
    method: "POST",
  });

  const text = await res.text();

  out.textContent = text;

  loadStats();

}

document.getElementById("doctor").onclick = () => run("doctor");
document.getElementById("publish").onclick = () => run("publish");
document.getElementById("newArticle").onclick = () => run("new");