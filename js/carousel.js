const carouselEl = document.querySelector(".carousel");
const tagEl = document.querySelector(".music-info .tag");
const titleEl = document.querySelector(".music-info h2");
const descEl = document.querySelector(".music-info p");
const linkEl = document.querySelector(".music-info a");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let playlists = [];
let currentIndex = 0;

async function loadPlaylists(){
  const res = await fetch("data/playlists.json");
  if(!res.ok) throw new Error("Impossibile caricare playlists.json");

  playlists = await res.json();
  currentIndex = 0;
  render();
}

function goTo(index){
  const len = playlists.length;
  currentIndex = (index + len) % len;
  render();
}

function render(){
  const len = playlists.length;
  const prevIndex = (currentIndex - 1 + len) % len;
  const nextIndex = (currentIndex + 1) % len;

  carouselEl.innerHTML = "";

  [prevIndex, currentIndex, nextIndex].forEach(i => {
    const playlist = playlists[i];

    const item = document.createElement("div");
    item.className = "carousel-item" + (i === currentIndex ? " active" : "");
    item.addEventListener("click", () => goTo(i));

    const img = document.createElement("img");
    img.src = playlist.image;
    img.alt = playlist.title;

    item.appendChild(img);
    carouselEl.appendChild(item);
  });

  const current = playlists[currentIndex];
  tagEl.textContent = current.tag;
  titleEl.textContent = current.title;
  descEl.textContent = current.description;
  linkEl.href = current.url;
}

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

document.addEventListener("keydown", e => {
  if(e.key === "ArrowLeft") goTo(currentIndex - 1);
  if(e.key === "ArrowRight") goTo(currentIndex + 1);
});

loadPlaylists().catch(err => {
  console.error(err);
  descEl.textContent = "Errore nel caricamento delle playlist. Se hai aperto il file direttamente nel browser, avvia un server locale (es. \"python3 -m http.server\") perché il fetch non funziona con file://.";
});
