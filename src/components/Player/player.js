import { displayMessage, openMusic } from "../../js/main.js";

const playBtn = document.querySelector("#play i"),

    notifyMusicIcon = document.querySelector("#music_icon"),

    showPlaylistBtn = document.querySelector("#show__playlist"),
    hidePlaylistBtn = document.querySelector("#close__playlist"),

    nextBtn = document.querySelector("#next"),
    previousBtn = document.querySelector("#previous"),
    shuffleBtn = document.querySelector("#shuffle"),
    repeatBtn = document.querySelector("#repeat"),

    turnDownVolume = document.querySelector("#volume__up"),
    turnUpVolume = document.querySelector("#volume__down"),

    currentTime = document.querySelector("#current__time"),
    duration = document.querySelector("#music__duration"),
    progress = document.querySelector("#progress"),
    progressFill = document.querySelector(".progress__fill"),

    volumeDisplay = document.querySelector("#volume__display"),
    volumeValue = document.querySelector("#volume__value"),

    nameText = document.querySelector("#music__name"),
    artistText = document.querySelector("#artist__name"),
    imageText = document.querySelector(".music__image"),

    playlistContainer = document.querySelector("#music__list"),
    playlist = document.querySelector(".playlist"),

    musicPath = "./src/music_player/",
    sounds = [
        // apenas exemplo...
        {
            music_name: "Rap do Johan Liebert",
            artist: "Enygma",
            image: musicPath + "img_sound01.webp",
            path: musicPath + "sound01.mp3"
        },
    ];

export class Player {
    constructor() {
        this.index = 0;
        this.shuffle = false;
        this.repeat = false;
        this.playing = false;
        this.audio = new Audio();

        this.audio.src = sounds[this.index].path;
        this.audio.volume = 0.5;

        this.init();
    }

    init() {
        this.update();
        this.showMusics();
        this.addEventListeners();
    }

    addEventListeners() {
        const remove_music_btn = document.querySelectorAll(".remove__music");

        this.audio.addEventListener("ended", () => {
            if (this.repeat) {
                this.audio.currentTime = 0;
                this.audio.play();
            } else {
                this.next();
            }
        });

        this.audio.addEventListener("play", () => {
            setInterval(() => this.progressUpdate(), 1000);
        });

        remove_music_btn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                let id = this.getAttribute('data-id');
                music_player.removeSong(id);
            });
        });

        notifyMusicIcon.addEventListener("click", () => { openMusic(); });

        hidePlaylistBtn.addEventListener("click", () => music_player.hidePlaylist());
        showPlaylistBtn.addEventListener("click", () => music_player.displayPlaylist());

        playBtn.addEventListener("click", () => music_player.playPause());

        nextBtn.addEventListener("click", () => music_player.next());

        previousBtn.addEventListener("click", () => music_player.previous());

        shuffleBtn.addEventListener("click", () => music_player.isAleatory());
        repeatBtn.addEventListener("click", () => music_player.isRepeat());

        turnDownVolume.addEventListener("click", () => {
            music_player.volumeUp();

            setTimeout(() => volumeDisplay.style.display = "none", 500);
        });

        turnUpVolume.addEventListener("click", () => {
            music_player.volumeDown();

            setTimeout(() => volumeDisplay.style.display = "none", 500);
        });

        progress.addEventListener("click", (e) => {
            let progressWidth = progress.clientWidth, x = e.offsetX, duration = music_player.audio.duration;

            music_player.audio.currentTime = (x / progressWidth) * duration;
            progressFill.style.width = `${(x / progressWidth) * 100}%`;

            if (music_player.audio.paused) music_player.playPause();
        });

        // eventos tochstart
        remove_music_btn.forEach(function (btn) {
            btn.addEventListener('touchstart', e => {
                e.preventDefault();
                let id = this.getAttribute('data-id');
                music_player.removeSong(id);
            });
        });

        notifyMusicIcon.addEventListener("touchstart", e => {
            e.preventDefault();
            openMusic();
        });

        hidePlaylistBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.hidePlaylist();
        });

        showPlaylistBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.displayPlaylist();
        });

        playBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.playPause();
        });

        nextBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.next();
        });

        previousBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.previous();
        });

        shuffleBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.isAleatory();
        });

        repeatBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.isRepeat();
        });

        turnDownVolume.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.volumeUp();

            setTimeout(() => volumeDisplay.style.display = "none", 500);
        });

        turnUpVolume.addEventListener("touchstart", e => {
            e.preventDefault();
            music_player.volumeDown();

            setTimeout(() => volumeDisplay.style.display = "none", 500);
        });
    }

    play() {
        this.playing = true;
        this.audio.play();

        notifyMusicIcon.style.display = "block";

        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");

        playBtn.setAttribute("title", "Pausar");

        this.update();
    }

    pause() {
        this.playing = false;
        this.audio.pause();

        notifyMusicIcon.style.display = "none";

        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");

        playBtn.setAttribute("title", "Iniciar");
    }

    playPause() { this.playing ? this.pause() : this.play(); }

    next() {
        if (this.shuffle) {
            this.index = Math.floor(Math.random() * sounds.length);
        } else {
            this.index++;
            if (this.index >= sounds.length) this.index = 0;
        }

        this.audio.src = sounds[this.index].path;
        this.play();
    }

    previous() {
        if (this.shuffle) {
            this.index = Math.floor(Math.random() * sounds.length);
        } else {
            this.index--;
            if (this.index < 0) this.index = sounds.length - 1;
        }
        this.audio.src = sounds[this.index].path;
        this.play();
    }

    isRepeat() {
        this.repeat = !this.repeat;
        repeatBtn.querySelector('i').classList.toggle("active");

        if (this.repeat) repeatBtn.setAttribute("title", "Desativar repetição");
        else repeatBtn.setAttribute("title", "Ativar repetição");
    }

    isAleatory() {
        this.shuffle = !this.shuffle;
        shuffleBtn.querySelector('i').classList.toggle("active");

        if (this.shuffle) shuffleBtn.setAttribute("title", "Desativar modo aleatório");
        else shuffleBtn.setAttribute("title", "Ativar modo aleatório");
    }

    update() {
        if (playlistContainer.classList.contains("empty")) {
            playlistContainer.classList.remove("empty");
            imageText.style.display = "block";
        }

        nameText.textContent = sounds[this.index].music_name;
        artistText.textContent = `Artista: ${sounds[this.index].artist}`;
        imageText.querySelector('img').src = sounds[this.index].image;
    }

    volumeUp() {
        this.audio.volume += 0.1;

        let volume = Math.floor(this.audio.volume * 100)

        volumeDisplay.style.display = "flex";
        volumeValue.innerHTML = `${volume}%`;

        if (volume == 0) {
            volumeDisplay.querySelector("i").classList.remove("fa-volume-up");
            volumeDisplay.querySelector("i").classList.add("fa-volume-mute");
        } else {
            volumeDisplay.querySelector("i").classList.remove("fa-volume-up");
            volumeDisplay.querySelector("i").classList.add("fa-volume-up");
        }
    }

    volumeDown() {
        this.audio.volume -= 0.1;

        let volume = Math.floor(this.audio.volume * 100)

        volumeDisplay.style.display = "flex";
        volumeValue.innerHTML = `${volume}%`;

        if (volume == 0) {
            volumeDisplay.querySelector("i").classList.remove("fa-volume-down");
            volumeDisplay.querySelector("i").classList.add("fa-volume-mute");
        } else {
            volumeDisplay.querySelector("i").classList.remove("fa-volume-mute");
            volumeDisplay.querySelector("i").classList.add("fa-volume-down");
        }
    }

    formatTime(time) {
        let minutes = Math.floor(time / 60), seconds = Math.floor(time % 60);

        if (seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    }

    progressUpdate() {
        progress.value = (this.audio.currentTime / this.audio.duration) * 100;
        progress.setAttribute("title", `${this.formatTime(this.audio.currentTime)}`);
        progressFill.style.width = `${(this.audio.currentTime / this.audio.duration) * 100}%`;

        currentTime.textContent = this.formatTime(this.audio.currentTime);
        duration.textContent = this.formatTime(this.audio.duration);
    }

    addMusic() {
        let music = document.querySelector("#music__name__input");
        let artist = document.querySelector("#music__artist__input");
        let image = document.querySelector("#music__image__input");
        let path = document.querySelector("#music__path__input");

        if (music.value == "" || artist.value == "" || image.value == "" || path.value == "") {
            displayMessage("Preencha todos os campos!"); return;
        }

        sounds.push({
            music_name: music.value,
            artist: artist.value,
            image: image.value,
            path: path.value,
        });

        displayMessage("Música adicionada com sucesso!");

        music.value = "";
        artist.value = "";
        image.value = "";
        path.value = "";

        this.update();
        this.showMusics();
    }

    removeSong(index) {
        sounds.splice(index, 1);

        let element = document.getElementById(index);
        playlistContainer.removeChild(element);

        if (playlistContainer.childNodes.length == 0) {
            playlistContainer.classList.add("empty");
            playlistContainer.innerHTML = `<li>Nenhuma música adicionada</li>`;

            nameText.textContent = "Nenhuma música encontrada";
            artistText.textContent = "";
            imageText.style.display = "none";
            duration.textContent = "0:00";
            currentTime.textContent = "0:00";
            progress.value = 0;
            this.audio.src = "";
        } else
            imageText.style.display = "block";
    }

    displayPlaylist() { playlist.classList.add("active"); }
    hidePlaylist() { playlist.classList.remove("active"); }

    showMusics() {
        playlistContainer.innerHTML = "";

        if (playlistContainer.classList.contains("empty")) return;
        else {
            sounds.forEach((sound, index) => {
                let music = document.createElement("li");

                music.id = index;
                music.classList.add("music");

                music.innerHTML = `
                <div class="music__item">
                    <img src="${sound.image}" alt="${sound.music_name}" width="64" height="64">  
                    <div class="music__info">
                        <h3>${sound.music_name}</h3>
                        <div class="music__nav">
                            <i class="fas fa-trash-alt remove__music" title="Remover música" data-id="${index}"></i>
                            <p>- ${sound.artist}</p>  
                        </div>
                    </div>
                </div>`;

                playlistContainer.appendChild(music);
            });
        }
    }
}

export const music_player = new Player();