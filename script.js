const artworks = [
    {
        title: "The Lady of the Lake",
        artist: "Walter Crane",
        description: "19th-century Romantic illustrators.A mythological artwork inspired by Arthurian legends, symbolizing chivalry, mystery, and medieval romance.",
        category: "mythological",
        image: "images/art1.jpg"
    },
    {
        title: "A Dutch Man-of-War Firing a Salute",
        artist: "Willem van de Velde the Younger",
        description: "A marine painting showing naval power and seafaring life, painted with realistic ship details and calm waters.",
        category: "marine",
        image: "images/art2.jpg"
    },
    {
        title: "Untitled (Street Mural",
        artist: "Contemporary street artist",
        description: "A modern mural using bold colors and simple forms to express identity and emotion.",
        category: "street",
        image: "images/art3.jpg"
    },

    {
        title: "Untitled Portrait Mural",
        artist: "Contemporary urban artist",
        description: "This mural highlights emotions through intense colors and exaggerated facial features, a key characteristic of expressionist art.",
        category: "street",
        image: "images/art4.jpg"
    },
    {
        title: "Untitled (Musician abstraction)",
        artist: "Contemporary mural artist",
        description: "An abstract artwork where the human figure is simplified into geometric shapes to show movement and rhythm.",
        category: "modern",
        image: "images/art5.jpg"
    },
    {
        title: "Lady Feeding Deer",
        artist: "Mughal or Pahari school (India, 18th century)",
        description: "A traditional Indian miniature painting showing harmony between humans and nature.",
        category: "traditional",
        image: "images/art6.jpg"
    },
    {
        title: "Lord Shiva in Meditation",
        artist: "Unknown (Indian Miniature Painter)",
        description: "An abstract artwork where the human figure is simplified into geometric shapes to show movement and rhythm.",
        category: "mythological",
        image: "images/art7.jpg"
    },
    {
        title: "Still Life with Flowers",
        artist: "Unknown / European School Painter",
        description: "This mural highlights emotions through intense colors and exaggerated facial features, a key characteristic of expressionist art.",
        category: "modern",
        image: "images/art8.jpg"
    },
];

const gallery = document.getElementById("gallery");

function displayArt(list) {
    gallery.innerHTML = "";
    list.forEach(art => {
        const card = document.createElement("div");
        card.className = "art-card";
        card.innerHTML = `
            <img src="${art.image}">
            <h3>${art.title}</h3>
        `;
        card.onclick = () => openModal(art);
        gallery.appendChild(card);
    });
}

function filterArt(category) {
    if (category === "all") {
        displayArt(artworks);
    } else {
        const filtered = artworks.filter(a => a.category === category);
        displayArt(filtered);
    }
}

function openModal(art) {
    document.getElementById("modalImg").src = art.image;
    document.getElementById("modalTitle").innerText = art.title;
    document.getElementById("modalArtist").innerText = "Artist: " + art.artist;
    document.getElementById("modalDesc").innerText = art.description;
    document.getElementById("artModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("artModal").style.display = "none";
}

displayArt(artworks);
