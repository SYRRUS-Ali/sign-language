document.getElementById("translateBtn").addEventListener("click", function () {
  const sourceLanguage = document.getElementById("sourceLanguage").value;
  const word = document.getElementById("word").value.trim();
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
      const entry = data.find((item) => item.word[sourceLanguage] === word);

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


document.getElementById("feedbackForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const comments = document.getElementById("comments").value.trim();

  if (!rating) {
    alert("Please select a rating before submitting.");
    return;
  }

  const feedbackData = {
    rating,
    comments,
  };

  try {
    const response = await fetch("/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Thank you for your rating!");
      document.getElementById("feedbackForm").reset();
    } else {
      alert("Error saving feedback. Please try again.");
    }
  } catch (error) {
    alert("An error occurred while submitting your feedback.");
    console.error("Error:", error);
  }
});

