document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lines = [];

    const setCanvasDimensions = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeLines();
    }

    const initializeLines = () => {
        lines = [];
        const spacing = 40;
        for (let y = 0; y < canvas.height; y += spacing) {
            lines.push({ x1: 0, y1: y, x2: canvas.width, y2: y, isHorizontal: true });
        }
        for (let x = 0; x < canvas.width; x += spacing) {
            lines.push({ x1: x, y1: 0, x2: x, y2: canvas.height, isHorizontal: false });
        }
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        lines.forEach(line => {
            const { x1, y1, x2, y2, isHorizontal } = line;
            const lineCenter = isHorizontal ? y1 : x1;
            const mouseValue = isHorizontal ? mouseY : mouseX;
            const distance = Math.abs(lineCenter - mouseValue);
            const maxDistance = 200;
            const maxDisplacement = 30;
            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * maxDisplacement;
                ctx.beginPath();
                if (isHorizontal) {
                    ctx.moveTo(0, y1);
                    for (let x = 0; x < canvas.width; x += 10) {
                        const dx = x - mouseX;
                        const distanceFromPoint = Math.sqrt(dx * dx + Math.pow(y1 - mouseY, 2));
                        const displacement = distanceFromPoint < maxDistance
                            ? force * (1 - distanceFromPoint / maxDistance) * (lineCenter < mouseValue ? -1 : 1)
                            : 0;
                        ctx.lineTo(x, y1 + displacement);
                    }
                } else {
                    ctx.moveTo(x1, 0);
                    for (let y = 0; y < canvas.height; y += 10) {
                        const dy = y - mouseY;
                        const distanceFromPoint = Math.sqrt(Math.pow(x1 - mouseX, 2) + dy * dy);
                        const displacement = distanceFromPoint < maxDistance
                            ? force * (1 - distanceFromPoint / maxDistance) * (lineCenter < mouseValue ? -1 : 1)
                            : 0;
                        ctx.lineTo(x1 + displacement, y);
                    }
                }
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        });
        requestAnimationFrame(draw);
    }

    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            e.preventDefault();
        }
    }

    setCanvasDimensions();
    draw();
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
});