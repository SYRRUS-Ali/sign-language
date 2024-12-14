document.addEventListener("DOMContentLoaded", () => {
    const videos = {
        "University - বিশ্ববিদ্যালয়": "Videos/BengaliSignLang/university.mp4",
        "Office - অফিস": "Videos/BengaliSignLang/office.mp4",
        "School - স্কুল": "Videos/BengaliSignLang/school.mp4",
        "bread - রুটি": "Videos/BengaliSignLang/bread.mp4",
        "food - খাদ্য": "Videos/BengaliSignLang/food.mp4",
        "grape - আঙ্গুর": "Videos/BengaliSignLang/grape.mp4",
        "jackfruit - কাঁঠাল": "Videos/BengaliSignLang/jackfruit.mp4",
        "milk - দুধ": "Videos/BengaliSignLang/milk.mp4",
        "papaya - পেঁপে": "Videos/BengaliSignLang/papaya.mp4",
        "rice - চাল": "Videos/BengaliSignLang/rice.mp4",
        "sweet - মিষ্টি": "Videos/BengaliSignLang/sweet.mp4",
        "apple - আপেল": "Videos/BengaliSignLang/apple.mp4",
        "banana - কলা": "Videos/BengaliSignLang/banana.mp4",
        "chicken - মুরগি": "Videos/BengaliSignLang/chicken.mp4",
        "coffee - কফি": "Videos/BengaliSignLang/coffee.mp4",
        "dal - ডাল": "Videos/BengaliSignLang/dal.mp4",
        "fish - মাছ": "Videos/BengaliSignLang/fish.mp4",
        "mango - আম": "Videos/BengaliSignLang/mango.mp4",
        "meat - মাংস": "Videos/BengaliSignLang/meat.mp4",
        "orange - কমলা": "Videos/BengaliSignLang/orange.mp4",
        "tea - চা": "Videos/BengaliSignLang/tea.mp4",
        "vegetable - সবজি": "Videos/BengaliSignLang/vegetable.mp4",
        "water - জল": "Videos/BengaliSignLang/water.mp4",
        "College - কলেজ": "Videos/BengaliSignLang/college.mp4"
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
                case "translator":
                    window.location.href = "index.html";
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
            collapsibleButton.textContent = "ভিডিও শিরোনাম লুকান";
        } else {
            videoListContainer.style.display = "none";
            collapsibleButton.textContent = "ভিডিও শিরোনাম দেখান";
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
