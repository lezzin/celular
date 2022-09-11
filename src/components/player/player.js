import { displayMessage, openMusic } from "../../js/main.js";

const play_btn = document.querySelector("#play i"),

    notify_music_icon = document.querySelector("#music_icon"),

    show_playlist_btn = document.querySelector("#show__playlist"),
    hide_playlist_btn = document.querySelector("#close__playlist"),

    next_btn = document.querySelector("#next"),
    previous_btn = document.querySelector("#previous"),
    shuffle_btn = document.querySelector("#shuffle"),
    repeat_btn = document.querySelector("#repeat"),

    turn_down_volume = document.querySelector("#volume__up"),
    turn_up_volume = document.querySelector("#volume__down"),

    remove_music_btn = document.querySelectorAll('.remove__music'),

    current_time = document.querySelector("#current__time"),
    duration = document.querySelector("#music__duration"),
    progress = document.querySelector("#progress"),
    progress_fill = document.querySelector(".progress__fill"),

    volume_display = document.querySelector("#volume__display"),
    volume_value = document.querySelector("#volume__value"),

    name_text = document.querySelector("#music__name"),
    artist_text = document.querySelector("#artist__name"),
    image_text = document.querySelector("#music__image"),

    music_list = document.querySelector("#music__list"),

    sounds = [
        {
            music_name: "Rap do Johan Liebert",
            artist: "Enygma",
            image: "./src/sounds/music_player/img_sound1.jpeg",
            path: "./src/sounds/music_player/sound1.mp3",
        },
        {
            music_name: "Rap do Thorfinn",
            artist: "Enygma",
            image: "./src/sounds/music_player/img_sound2.jpeg",
            path: "./src/sounds/music_player/sound2.mp3",
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
        this.addEventListeners();
        this.update();
        this.showMusics();
    }

    addEventListeners() {
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
                alert("Botão clicado!");

                let id = this.getAttribute('data-id');
                music_player.removeSong(id);
            });
        });

        notify_music_icon.addEventListener("click", () => { openMusic(); });

        hide_playlist_btn.addEventListener("click", () => music_player.hidePlaylist());
        show_playlist_btn.addEventListener("click", () => music_player.displayPlaylist());

        play_btn.addEventListener("click", () => music_player.playPause());

        next_btn.addEventListener("click", () => music_player.next());

        previous_btn.addEventListener("click", () => music_player.previous());

        shuffle_btn.addEventListener("click", () => music_player.isAleatory());
        repeat_btn.addEventListener("click", () => music_player.isRepeat());

        turn_down_volume.addEventListener("click", () => {
            music_player.volumeUp();

            setTimeout(() => volume_display.style.display = "none", 500);
        });

        turn_up_volume.addEventListener("click", () => {
            music_player.volumeDown();

            setTimeout(() => volume_display.style.display = "none", 500);
        });

        progress.addEventListener("click", (e) => {
            let progressWidth = progress.clientWidth, x = e.offsetX, duration = music_player.audio.duration;

            music_player.audio.currentTime = (x / progressWidth) * duration;
            progress_fill.style.width = `${(x / progressWidth) * 100}%`;

            if (music_player.audio.paused) music_player.playPause();
        });
    }

    play() {
        this.playing = true;
        this.audio.play();

        notify_music_icon.style.display = "block";

        play_btn.classList.remove("fa-play");
        play_btn.classList.add("fa-pause");

        play_btn.setAttribute("title", "Pausar");

        this.update();
    }

    pause() {
        this.playing = false;
        this.audio.pause();

        notify_music_icon.style.display = "none";

        play_btn.classList.remove("fa-pause");
        play_btn.classList.add("fa-play");

        play_btn.setAttribute("title", "Iniciar");
    }

    playPause() {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }

    next() {
        if (this.shuffle) {
            this.index = Math.floor(Math.random() * sounds.length);
        } else {
            this.index++;
            if (this.index >= sounds.length) {
                this.index = 0;
            }
        }
        this.audio.src = sounds[this.index].path;
        this.play();
    }

    previous() {
        if (this.shuffle) {
            this.index = Math.floor(Math.random() * sounds.length);
        } else {
            this.index--;
            if (this.index < 0) {
                this.index = sounds.length - 1;
            }
        }
        this.audio.src = sounds[this.index].path;
        this.play();
    }

    isRepeat() {
        this.repeat = !this.repeat;
        repeat_btn.querySelector('i').classList.toggle("active");

        if (this.repeat) repeat_btn.setAttribute("title", "Desativar repetição");
        else repeat_btn.setAttribute("title", "Ativar repetição");
    }

    isAleatory() {
        this.shuffle = !this.shuffle;
        shuffle_btn.querySelector('i').classList.toggle("active");

        if (this.shuffle) shuffle_btn.setAttribute("title", "Desativar modo aleatório");
        else shuffle_btn.setAttribute("title", "Ativar modo aleatório");
    }

    update() {
        if (music_list.classList.contains("empty")) {
            music_list.classList.remove("empty");
            image_text.style.display = "block";
        }

        name_text.textContent = sounds[this.index].music_name;
        artist_text.textContent = `Artista: ${sounds[this.index].artist}`;
        image_text.src = sounds[this.index].image;
    }

    volumeUp() {
        this.audio.volume += 0.1;

        let volume = Math.floor(this.audio.volume * 100)

        volume_display.style.display = "flex";
        volume_value.innerHTML = `${volume}%`;

        if (volume == 0) {
            volume_display.querySelector("i").classList.remove("fa-volume-up");
            volume_display.querySelector("i").classList.add("fa-volume-mute");
        } else {
            volume_display.querySelector("i").classList.remove("fa-volume-up");
            volume_display.querySelector("i").classList.add("fa-volume-up");
        }
    }

    volumeDown() {
        this.audio.volume -= 0.1;

        let volume = Math.floor(this.audio.volume * 100)

        volume_display.style.display = "flex";
        volume_value.innerHTML = `${volume}%`;

        if (volume == 0) {
            volume_display.querySelector("i").classList.remove("fa-volume-down");
            volume_display.querySelector("i").classList.add("fa-volume-mute");
        } else {
            volume_display.querySelector("i").classList.remove("fa-volume-mute");
            volume_display.querySelector("i").classList.add("fa-volume-down");
        }
    }

    formatTime(time) {
        let minutes = Math.floor(time / 60), seconds = Math.floor(time % 60);

        if (seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    }

    progressUpdate() {
        progress.value = (this.audio.currentTime / this.audio.duration) * 100;
        progress_fill.style.width = `${(this.audio.currentTime / this.audio.duration) * 100}%`;

        current_time.innerHTML = this.formatTime(this.audio.currentTime);
        duration.innerHTML = this.formatTime(this.audio.duration);
    }

    addMusic() {
        let music = document.querySelector("#music__name__input");
        let artist = document.querySelector("#music__artist__input");
        let image = document.querySelector("#music__image__input");
        let path = document.querySelector("#music__path__input");

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
        music_list.removeChild(element);

        if (music_list.childNodes.length == 0) {
            music_list.classList.add("empty");
            music_list.innerHTML = `<li>Nenhuma música adicionada</li>`;

            name_text.textContent = "Nenhuma música encontrada";
            artist_text.textContent = "";
            image_text.style.display = "none";
            this.audio.src = "";
        } else {
            image_text.style.display = "block";
        }
    }

    displayPlaylist() {
        let playlist = document.querySelector(".playlist");

        playlist.classList.add("active");
    }

    hidePlaylist() {
        let playlist = document.querySelector(".playlist");

        playlist.classList.remove("active");
    }

    showMusics() {
        if (music_list.classList.contains("empty"))
            music_list.innerHTML = "";
        else {
            music_list.innerHTML = "";
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

                music_list.appendChild(music);
            });
        }
    }
}

export const music_player = new Player();