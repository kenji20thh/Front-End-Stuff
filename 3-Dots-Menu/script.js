document.addEventListener('DOMContentLoaded', function () {
    const dotsGrid = document.getElementById('dotsGrid');
    const appsGrid = document.getElementById('appsGrid');
    const overlay = document.getElementById('overlay');
    const appIcons = document.querySelectorAll('.app-icon');

    const centerX = 150;  
    const centerY = 150;  

    const originalPositions = [];

    appIcons.forEach((icon, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const finalLeft = col * 90 + 15; 
        const finalTop = row * 90 + 15;  
        originalPositions.push({ left: finalLeft, top: finalTop });
        icon.style.position = 'absolute';
        icon.style.left = centerX - 35 + 'px'; 
        icon.style.top = centerY - 35 + 'px';  
    });

    dotsGrid.addEventListener('click', function () {
        dotsGrid.style.opacity = '0';
        appsGrid.classList.add('active');
        overlay.classList.add('active');
        appIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('visible');
                icon.style.transition = 'opacity 0.3s ease, transform 0.5s ease, left 0.5s ease, top 0.5s ease';
                icon.style.left = originalPositions[index].left + 'px';
                icon.style.top = originalPositions[index].top + 'px';
            }, 100 * index); 
        });
    });

    overlay.addEventListener('click', function () {
        appIcons.forEach((icon, index) => {
            icon.style.left = centerX - 35 + 'px';
            icon.style.top = centerY - 35 + 'px';
            icon.classList.remove('visible');
        });
        appsGrid.classList.remove('active');
        overlay.classList.remove('active');
        setTimeout(() => {
            dotsGrid.style.opacity = '1';
        }, 300);
    });
});