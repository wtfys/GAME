const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = [];
let score = 0;
const scoreLimit = 15;

class Bubble {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

function createBubble() {
    const radius = Math.random() * 20 + 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    bubbles.push(new Bubble(x, y, radius, dx, dy));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble, index) => {
        bubble.update();

        if (bubble.radius <= 0) {
            bubbles.splice(index, 1);
        }
    });
}

function popBubble(event) {
    const x = event.clientX;
    const y = event.clientY;

    bubbles.forEach((bubble, index) => {
        const dist = Math.hypot(bubble.x - x, bubble.y - y);

        if (dist - bubble.radius < 1) {
            score += 1;
            scoreElement.textContent = `Score: ${score}`;
            bubble.radius = 0;

            if (score >= scoreLimit) {
                setTimeout(() => {
                    alert('恭喜通关！');
                    score = 0;
                    scoreElement.textContent = `Score: ${score}`;
                    bubbles = [];
                }, 100);
            }
        }
    });
}

canvas.addEventListener('click', popBubble);
setInterval(createBubble, 1000);
animate();
