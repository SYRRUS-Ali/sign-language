document.getElementById('saveFeedback').addEventListener('click', async () => {
    const rating = document.querySelector('input[name="rating"]:checked')?.value || "No rating given";
    const comments = document.getElementById('comments').value;
    const time = new Date().toISOString();

    const feedback = {
      time,
      rating,
      comments,
    };

    const feedbackJson = JSON.stringify(feedback, null, 2);

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "feedback.json",
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(feedbackJson);
      await writable.close();

      alert("Feedback saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  });
