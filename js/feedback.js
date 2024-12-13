document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const rating = document.querySelector('input[name="rating"]:checked');
    const ratingValue = rating ? rating.value : null;
    const comments = document.getElementById('comments').value.trim();

    // Validate the feedback
    if (!ratingValue) {
        alert('Please provide a rating.');
        return;
    }

    // Prepare data for submission
    const formData = new FormData();
    formData.append('rating', ratingValue);
    formData.append('comments', comments);

    // Submit feedback via AJAX
    fetch('feedback_handler.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('responseMessage').textContent = 'Thank you for your feedback!';
            document.getElementById('feedbackForm').reset(); // Reset form after successful submission
        } else {
            document.getElementById('responseMessage').textContent = 'Error: ' + data.message;
        }
    })
    .catch(error => {
        console.error('Error submitting feedback:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred. Please try again later.';
    });
});
