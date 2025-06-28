const audio = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const author = document.getElementById('song-author');
const songname=document.getElementById("song-name")
const currentImage=document.getElementById('cover-page');
const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

class song{
    constructor(audio,name,author,image){
        this.audio=audio;
        this.name=name;
        this.author=author;
        this.image=image;
    }
}
const songs =[]
songs.push(new song("demo.mp3","Daaku Mahaaraj","Thaman S","demo.jpg"));
songs.push(new song("demo2.mp3","Andala Sandohama","chandu ravi","demo2.jpg"));
songs.push(new song("Prema Velluva.mp3","Prema Velluva","Sid Sriram","demo3.jpg"))
songs.push(new song("Swathi Reddy.mp3","Swathi Reddy","Sid Sriram","mad2.jpg"))
songs.push(new song("Dont Stop-SenSongsMp3.Co.mp3","Don't Stop","Sid Sriram","Dont't.jpg"))
let currentIndex = 0;
function loadSong(index) {
  audio.src = songs[index].audio;
  songname.innerText=songs[index].name;
  author.innerText=songs[index].author;
  currentImage.setAttribute("src",songs[index].image);
  audio.play();
  playPause.textContent = "⏸️";
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});
playPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = "⏸️";
  } else {
    audio.pause();
    playPause.textContent = "▶️";
  }
});
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
  loadSong(currentIndex);
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
  loadSong(currentIndex);
});
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
});

playlist.addEventListener("change", () => {
  currentIndex = parseInt(playlist.value);
  loadSong(currentIndex);
});

loadSong(currentIndex);
