document.addEventListener("DOMContentLoaded", function() {
    const bengaliSection = document.getElementById("bengali");
    const russianSection = document.getElementById("russian");
    const americanSection = document.getElementById("american");

    videos.forEach(video => {
        const videoCard = `
            <div class="col-md-4">
                <a href="${video.category.toLowerCase()}.html" class="video-link text-decoration-none">
                    <div class="video-card p-3" data-vid="${video.keyword}">
                        <video controls class="w-100">
                            <source src="${video.image}" type="video/mp4" />
                        </video>
                        <p class="text-center mt-2">${video.name}</p>
                    </div>
                </a>
            </div>
        `;

        if (video.category === 'Bengali') {
            bengaliSection.querySelector('.row').innerHTML += videoCard;
        } else if (video.category === 'Russian') {
            russianSection.querySelector('.row').innerHTML += videoCard;
        } else if (video.category === 'American') {
            americanSection.querySelector('.row').innerHTML += videoCard;
        }
    });
});