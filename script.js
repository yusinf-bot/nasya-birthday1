const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const record = document.getElementById("record");
const musicFile = document.getElementById("musicFile");
const musicStatus = document.getElementById("musicStatus");
const songTitle = document.getElementById("songTitle");

playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
    } catch {
      musicStatus.textContent =
        "Pilih MP3 atau unggah file music/lagu.mp3 terlebih dahulu.";
    }
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playBtn.textContent = "❚❚ Pause";
  record.classList.add("playing");
  musicStatus.textContent = "Now playing ♡";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶ Play";
  record.classList.remove("playing");
});

musicFile.addEventListener("change", () => {
  const file = musicFile.files[0];
  if (!file) return;

  if (audio.dataset.objectUrl) {
    URL.revokeObjectURL(audio.dataset.objectUrl);
  }

  const url = URL.createObjectURL(file);
  audio.dataset.objectUrl = url;
  audio.src = url;
  songTitle.textContent = file.name.replace(/\.[^/.]+$/, "");
  audio.play().catch(() => {
    musicStatus.textContent = "Tekan Play untuk memulai lagu.";
  });
});

const lightbox = document.getElementById("lightbox");
const bigPhoto = document.getElementById("bigPhoto");
const photoCaption = document.getElementById("photoCaption");

document.querySelectorAll(".polaroid").forEach(card => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");

    if (!image.complete || image.naturalWidth === 0) {
      alert("Foto belum ditemukan. Periksa nama file dan folder images.");
      return;
    }

    bigPhoto.src = image.src;
    photoCaption.textContent = card.dataset.caption;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closePhoto() {
  lightbox.classList.remove("open");
  bigPhoto.src = "";
  document.body.style.overflow = "";
}

document.getElementById("closeLightbox")
  .addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closePhoto();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePhoto();
});

document.getElementById("surpriseBtn")
  .addEventListener("click", () => {
    const symbols = ["♡", "♥", "✦", "✧", "✿"];

    for (let i = 0; i < 30; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDelay = Math.random() + "s";
      piece.style.color =
        ["#f4c6cf", "#fff3e8", "#b52b4a", "#7e9fb6"][
          Math.floor(Math.random() * 4)
        ];

      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4500);
    }
  });
