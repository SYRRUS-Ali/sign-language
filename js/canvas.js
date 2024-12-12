const canvasConfigs = [
    { id: "canvas-red", color: "rgba(150, 10, 10, 0.6)" },
    { id: "canvas-blue", color: "rgba(0, 84, 174, 0.6)" },
    { id: "canvas-green", color: "rgba(10, 150, 10, 0.6)" },
    { id: "canvas-dark", color: "rgba(66, 189, 248, 0.6)" },
];

canvasConfigs.forEach(({ id, color }) => {
    const canvas = document.getElementById(id);
    if (!canvas) {
        console.error(`Canvas with id "${id}" not found.`);
        return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const shapes = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 5,
        color,
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
});
