const artworks = [
  {
    title: "The Lady of the Lake",
    artist: "Walter Crane",
    description: "A mythological artwork by a 19th-century Romantic illustrator, inspired by Arthurian legend and symbolizing chivalry, mystery, and medieval romance.",
    category: "mythological",
    image: "images/grid/art1.jpg",
    full: "images/full/art1.jpg"
  },
  {
    title: "A Dutch Man-of-War Firing a Salute",
    artist: "Willem van de Velde the Younger",
    description: "A marine painting showing naval power and seafaring life, rendered with realistic ship detail and calm waters.",
    category: "marine",
    image: "images/grid/art2.jpg",
    full: "images/full/art2.jpg"
  },
  {
    title: "Untitled (Street Mural)",
    artist: "Contemporary street artist",
    description: "A modern mural using bold colors and simple forms to express identity and emotion.",
    category: "street",
    image: "images/grid/art3.jpg",
    full: "images/full/art3.jpg"
  },
  {
    title: "Untitled Portrait Mural",
    artist: "Contemporary urban artist",
    description: "This mural foregrounds emotion through intense color and exaggerated facial features, a hallmark of expressionist street art.",
    category: "street",
    image: "images/grid/art4.jpg",
    full: "images/full/art4.jpg"
  },
  {
    title: "Untitled (Musician Abstraction)",
    artist: "Contemporary mural artist",
    description: "An abstract work where the human figure is simplified into geometric shapes to suggest movement and rhythm.",
    category: "modern",
    image: "images/grid/art5.jpg",
    full: "images/full/art5.jpg"
  },
  {
    title: "Lady Feeding Deer",
    artist: "Mughal or Pahari school (India, 18th century)",
    description: "A traditional Indian miniature painting depicting harmony between humans and nature.",
    category: "traditional",
    image: "images/grid/art6.jpg",
    full: "images/full/art6.jpg"
  },
  {
    title: "Lord Shiva in Meditation",
    artist: "Unknown (Indian miniature painter)",
    description: "A devotional miniature rendered in fine linework and jewel tones, portraying stillness and inward focus.",
    category: "mythological",
    image: "images/grid/art7.jpg",
    full: "images/full/art7.jpg"
  },
  {
    title: "Still Life with Flowers",
    artist: "Unknown / European school painter",
    description: "A classical still life balancing composition and color, in the long European tradition of floral painting.",
    category: "modern",
    image: "images/grid/art8.jpg",
    full: "images/full/art8.jpg"
  }
];

const gallery = document.getElementById("gallery");
const filtersNav = document.getElementById("filters");
const modal = document.getElementById("artModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalCategory = document.getElementById("modalCategory");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevArt");
const nextBtn = document.getElementById("nextArt");

let currentList = artworks;
let currentIndex = -1;
let lastFocused = null;

function displayArt(list) {
  currentList = list;
  gallery.innerHTML = "";

  if (list.length === 0) {
    gallery.innerHTML = `<p class="gallery__empty">No pieces in this category yet.</p>`;
    return;
  }

  list.forEach((art, index) => {
    const card = document.createElement("article");
    card.className = "art-frame";
    card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${art.title} by ${art.artist}`);
    card.innerHTML = `
      <div class="art-frame__image">
        <img src="${art.image}" alt="${escapeHtml(art.title)}, by ${escapeHtml(art.artist)}" loading="lazy">
      </div>
      <div class="art-frame__label">
        <p class="art-frame__category">${art.category}</p>
        <h3 class="art-frame__title">${escapeHtml(art.title)}</h3>
        <p class="art-frame__artist">${escapeHtml(art.artist)}</p>
      </div>
    `;
    const open = () => openModal(index);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    gallery.appendChild(card);
  });
}

function filterArt(category) {
  const list = category === "all" ? artworks : artworks.filter((a) => a.category === category);
  displayArt(list);
}

filtersNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".filters__item");
  if (!btn) return;
  filtersNav.querySelectorAll(".filters__item").forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  filterArt(btn.dataset.category);
});

// ---------- Lightbox ----------
function openModal(index) {
  currentIndex = index;
  const art = currentList[index];
  renderModal(art);
  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

function renderModal(art) {
  modalImg.src = art.full;
  modalImg.alt = `${art.title}, by ${art.artist}`;
  modalTitle.textContent = art.title;
  modalArtist.textContent = `${art.artist}`;
  modalCategory.textContent = art.category;
  modalDesc.textContent = art.description;
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

function showRelative(offset) {
  if (currentList.length === 0) return;
  currentIndex = (currentIndex + offset + currentList.length) % currentList.length;
  renderModal(currentList[currentIndex]);
}

closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", () => showRelative(-1));
nextBtn.addEventListener("click", () => showRelative(1));

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") showRelative(-1);
  if (e.key === "ArrowRight") showRelative(1);
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

displayArt(artworks);
