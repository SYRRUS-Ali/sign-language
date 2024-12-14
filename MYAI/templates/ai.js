document.getElementById("startRecognitionBtn").addEventListener("click", function() {
    fetch('/start_recognition', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("statusMessage").innerText = data.message;  
    })
    .catch(error => {
        console.error('Error:', error);  
        document.getElementById("statusMessage").innerText = 'Error starting recognition.';
    });
});