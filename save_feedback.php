<?php
// Define the folder to save feedback
$folder = "feedback";

// Ensure the folder exists
if (!is_dir($folder)) {
    mkdir($folder, 0777, true);
}

// Get form data
$rating = isset($_POST['rating']) ? $_POST['rating'] : 'Not Provided';
$comments = isset($_POST['comments']) ? trim($_POST['comments']) : 'No Comments';
$time = date('Y-m-d H:i:s');

// Create a feedback entry
$feedbackData = "Time: $time\nRating: $rating\nComments: $comments\n\n";

// Save feedback to a file
$file = $folder . "/feedback_" . time() . ".txt";
file_put_contents($file, $feedbackData);

// Confirm to the user
echo "Feedback submitted successfully!";
?>
