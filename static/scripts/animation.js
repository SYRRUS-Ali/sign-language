const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const aspectRatio = canvas.width / canvas.height;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        canvas.width = window.innerHeight * aspectRatio;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / aspectRatio;
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const shapes = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 5,
    color: `hsl(${Math.random() * 60 + 180}, ${Math.random() * 50 + 50}%, ${Math.random() * 50 + 50}%)`,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fillStyle = shape.color;
        ctx.fill();
        shape.x += shape.dx;
        shape.y += shape.dy;
        if (shape.x < 0 || shape.x > canvas.width) shape.dx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();

