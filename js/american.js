document.addEventListener("DOMContentLoaded", () => {
    const videos = {
        "English Alphabet": "videos/AmericanSignLang/English_Alphabet.mp4",
        "A": "videos/AmericanSignLang/A.mp4",
        "B": "videos/AmericanSignLang/B.mp4",
        "C": "videos/AmericanSignLang/C.mp4",
        "D": "videos/AmericanSignLang/D.mp4",
        "E": "videos/AmericanSignLang/E.mp4",
        "F": "videos/AmericanSignLang/F.mp4",
        "G": "videos/AmericanSignLang/G.mp4",
        "H": "videos/AmericanSignLang/H.mp4",
        "I": "videos/AmericanSignLang/I.mp4",
        "J": "videos/AmericanSignLang/J.mp4",
        "K": "videos/AmericanSignLang/K.mp4",
        "L": "videos/AmericanSignLang/L.mp4",
        "M": "videos/AmericanSignLang/M.mp4",
        "N": "videos/AmericanSignLang/N.mp4",
        "O": "videos/AmericanSignLang/O.mp4",
        "P": "videos/AmericanSignLang/P.mp4",
        "Q": "videos/AmericanSignLang/Q.mp4",
        "R": "videos/AmericanSignLang/R.mp4",
        "S": "videos/AmericanSignLang/S.mp4",
        "T": "videos/AmericanSignLang/T.mp4",
        "U": "videos/AmericanSignLang/U.mp4",
        "V": "videos/AmericanSignLang/V.mp4",
        "W": "videos/AmericanSignLang/W.mp4",
        "X": "videos/AmericanSignLang/X.mp4",
        "Y": "videos/AmericanSignLang/Y.mp4",
        "Z": "videos/AmericanSignLang/Z.mp4",
        "Day": "videos/AmericanSignLang/Day.mp4",
        "Week": "videos/AmericanSignLang/week.mp4",
        "Month": "videos/AmericanSignLang/month.mp4",
        "Year": "videos/AmericanSignLang/year.mp4"
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
                case "alphabet":
                    createVideoList({
                        "English Alphabet": videos["English Alphabet"],
                        "A": videos["A"],
                        "B": videos["B"],
                        "C": videos["C"],
                        "D": videos["D"],
                        "E": videos["E"],
                        "F": videos["F"],
                        "G": videos["G"],
                        "H": videos["H"],
                        "I": videos["I"],
                        "J": videos["J"],
                        "K": videos["K"],
                        "L": videos["L"],
                        "M": videos["M"],
                        "N": videos["N"],
                        "O": videos["O"],
                        "P": videos["P"],
                        "Q": videos["Q"],
                        "R": videos["R"],
                        "S": videos["S"],
                        "T": videos["T"],
                        "U": videos["U"],
                        "V": videos["V"],
                        "W": videos["W"],
                        "X": videos["X"],
                        "Y": videos["Y"],
                        "Z": videos["Z"]
                    });
                    break;
                case "days":
                    createVideoList({ 
                        "Day": videos["Day"],
                        "Week": videos["Week"],
                        "Month": videos["Month"],
                        "Year": videos["Year"]
                    });
                    break;
                case "months":
                    createVideoList({ "Month": videos["Month"] });
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
