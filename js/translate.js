document.getElementById("translateBtn").addEventListener("click", function () {
  const sourceLanguage = document.getElementById("sourceLanguage").value;
  const word = document.getElementById("word").value.trim().toLowerCase();
  const signLang = document.getElementById("signLang").value;

  if (!sourceLanguage || !signLang) {
    alert("Please select both source and target languages.");
    return;
  }

  if (word === "") {
    alert("Please enter a word to translate.");
    return;
  }

  const videoElement = document.getElementById("translatedVideo");

  fetch("videos.json")
    .then((response) => response.json())
    .then((data) => {
      const entry = data.find((item) => item.word[sourceLanguage]?.toLowerCase() === word);

      if (!entry) {
        alert("No translation available for this word.");
        return;
      }

      const videoId = entry.id;
      const videoPath = `videos/${signLang}/${videoId}.mp4`;

      videoElement.src = videoPath;
      videoElement.load();

      videoElement.onerror = function () {
        alert("No Video Yet for this word in the selected sign language.");
      };
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
      alert("An error occurred while fetching the translation data.");
    });
});
