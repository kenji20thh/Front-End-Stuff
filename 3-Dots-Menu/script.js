document.addEventListener('DOMContentLoaded', function() {
    const dotsGrid = document.getElementById('dotsGrid');
    const appsGrid = document.getElementById('appsGrid');
    const overlay = document.getElementById('overlay');
    const appIcons = document.querySelectorAll('.app-icon');
    
    // Calculate positions for animation
    const centerX = 150; // Half of apps-grid width
    const centerY = 150; // Half of apps-grid height
    
    // Store original positions
    const originalPositions = [];
    
    appIcons.forEach((icon, index) => {
      // Get the icon's position in the grid
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      // Calculate the final position
      const finalLeft = col * 90 + 15; // 90 = 70px (icon width) + 20px (gap)
      const finalTop = row * 90 + 15;  // 15px is for padding
      
      // Store the original position
      originalPositions.push({ left: finalLeft, top: finalTop });
      
      // Set initial position to center
      icon.style.position = 'absolute';
      icon.style.left = centerX - 35 + 'px'; // 35 is half of icon width
      icon.style.top = centerY - 35 + 'px';  // 35 is half of icon height
    });
    
    dotsGrid.addEventListener('click', function() {
      // Hide dots grid
      dotsGrid.style.opacity = '0';
      
      // Show apps grid
      appsGrid.classList.add('active');
      overlay.classList.add('active');
      
      // Animate app icons with delay
      appIcons.forEach((icon, index) => {
        setTimeout(() => {
          // Make icon visible
          icon.classList.add('visible');
          
          // Animate to final position
          icon.style.transition = 'opacity 0.3s ease, transform 0.5s ease, left 0.5s ease, top 0.5s ease';
          icon.style.left = originalPositions[index].left + 'px';
          icon.style.top = originalPositions[index].top + 'px';
        }, 100 * index); // 100ms delay between each icon
      });
    });
    
    overlay.addEventListener('click', function() {
      // Reset app icons to center
      appIcons.forEach((icon, index) => {
        icon.style.left = centerX - 35 + 'px';
        icon.style.top = centerY - 35 + 'px';
        icon.classList.remove('visible');
      });
      
      // Hide apps grid
      appsGrid.classList.remove('active');
      overlay.classList.remove('active');
      
      // Show dots grid after a short delay
      setTimeout(() => {
        dotsGrid.style.opacity = '1';
      }, 300);
    });
  });