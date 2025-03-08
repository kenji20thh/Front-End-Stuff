document.addEventListener('DOMContentLoaded', function() {
  const likeButton = document.getElementById('likeButton');
  const likeCount = document.getElementById('likeCount');
  let count = 0;
  
  likeButton.addEventListener('click', function() {
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
          count++;
      } else {
          count--;
      }
      
      likeCount.textContent = count;
  });
});