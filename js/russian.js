document.addEventListener("DOMContentLoaded", () => {
    const videos = {
        "Stroll - Бродить": "videos/RussianSignLang/stroll.mp4",
        "Boil - Варить": "videos/RussianSignLang/boil_food.mp4",
        "Guide - Вести": "videos/RussianSignLang/guide.mp4",
        "Conduct - Дирижировать": "videos/RussianSignLang/conduct.mp4",
        "Add - Добавить": "videos/RussianSignLang/add.mp4",
        "Fry - Жарить": "videos/RussianSignLang/fry.mp4",
        "Close - Закрыть": "videos/RussianSignLang/close.mp4",
        "Acquaint - Знакомить": "videos/RussianSignLang/acquaint.mp4",
        "Know - Знать": "videos/RussianSignLang/know.mp4",
        "Go - Идти": "videos/RussianSignLang/go.mp4"
    };

    const videoPlayer = document.getElementById("video-player");
    const videoSource = document.getElementById("video-source");
    const videoListContainer = document.querySelector(".content");
    const collapsibleButton = document.querySelector(".collapsible");
    const imagePlaceholder = document.getElementById("image-placeholder");

    videoListContainer.style.display = "none";
    videoPlayer.style.display = "none";

    function createVideoList(videoSet) {
        videoListContainer.innerHTML = "";

        Object.entries(videoSet).forEach(([title, path]) => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item");
            videoItem.textContent = title;
            videoItem.dataset.path = path;

            videoItem.addEventListener("click", () => {
                changeVideo(title, path);
            });

            videoListContainer.appendChild(videoItem);
        });

        videoListContainer.style.display = "block";
        videoListContainer.scrollIntoView({ behavior: "smooth" });
    }

    const navbarLinks = document.querySelectorAll(".navbar a");
    navbarLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = event.target.getAttribute("href").substring(1);

            videoListContainer.style.display = "none";

            switch(target) {
                case "verb":
                    createVideoList({
                        "Stroll - Бродить": videos["Stroll - Бродить"],
                        "Boil - Варить": videos["Boil - Варить"],
                        "Guide - Вести": videos["Guide - Вести"],
                        "Conduct - Дирижировать": videos["Conduct - Дирижировать"],
                        "Add - Добавить": videos["Add - Добавить"],
                        "Fry - Жарить": videos["Fry - Жарить"],
                        "Close - Закрыть": videos["Close - Закрыть"],
                        "Acquaint - Знакомить": videos["Acquaint - Знакомить"],
                        "Know - Знать": videos["Know - Знать"],
                        "Go - Идти": videos["Go - Идти"]
                    });
                    break;
                default:
                    console.log("Unknown section: " + target);
                    break;
            }
        });
    });

    collapsibleButton.addEventListener("click", () => {
        if (videoListContainer.style.display === "none") {
            videoListContainer.style.display = "block";
            collapsibleButton.textContent = "Hide Video Titles";
        } else {
            videoListContainer.style.display = "none";
            collapsibleButton.textContent = "Show Video Titles";
        }

        if (videoListContainer.style.display === "block") {
            videoListContainer.scrollIntoView({ behavior: "smooth" });
        }
    });

        Object.entries(videos).forEach(([title, path]) => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item");
            videoItem.textContent = title;
            videoItem.dataset.path = path;
    
            videoItem.addEventListener("click", () => {
                changeVideo(title, path);
            });
    
            videoListContainer.appendChild(videoItem);
        });
    
        function changeVideo(title, videoPath) {
            videoSource.src = videoPath;
            videoPlayer.load();
            videoPlayer.play();
    
            imagePlaceholder.style.display = "none";
            videoPlayer.style.display = "block";
    
            collapsibleButton.textContent = `${title}`;
            videoListContainer.style.display = "none";
            console.log(`Now playing: ${title} (${videoPath})`);
        }
});