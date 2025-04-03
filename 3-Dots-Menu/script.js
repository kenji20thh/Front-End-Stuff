document.addEventListener('DOMContentLoaded', function() {
    const dotsGrid = document.getElementById('dotsGrid');
    const appsGrid = document.getElementById('appsGrid');
    const overlay = document.getElementById('overlay');
    const appIcons = document.querySelectorAll('.app-icon');
    
    dotsGrid.addEventListener('click', function() {
      // Hide dots grid
      dotsGrid.style.opacity = '0';
      
      // Show apps grid
      appsGrid.classList.add('active');
      overlay.classList.add('active');
      
      // Show app icons with delay
      appIcons.forEach((icon, index) => {
        setTimeout(() => {
          icon.classList.add('visible');
        }, 50 * index); // 50ms delay between each icon
      });
    });
    
    overlay.addEventListener('click', function() {
      // Hide apps grid
      appsGrid.classList.remove('active');
      overlay.classList.remove('active');
      
      // Reset app icons
      appIcons.forEach(icon => {
        icon.classList.remove('visible');
      });
      
      // Show dots grid after a short delay
      setTimeout(() => {
        dotsGrid.style.opacity = '1';
      }, 300);
    });
  });