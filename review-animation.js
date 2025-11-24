  // Animate each number count: 0 to 100, then decrease to target number
document.addEventListener('DOMContentLoaded', () => {
  // ===== CONFIG =====
  const interval = 15; // ms between steps
  const maxCount = 150; // peak number before counting down
  const step = 1; // step size for counting

  // ===== SAFETY CHECK =====
  const reviewBlock = document.querySelector('.review-block');
  if (!reviewBlock) return; // Stop if block doesn't exist

  // ===== ANIMATION FUNCTION =====
  function startAnimation(item) {
    const numberEl = item.querySelector('.number');
    const target = parseInt(item.getAttribute('data-target'), 10);
    let current = 0;
    let direction = 1; // 1 = counting up, -1 = counting down

    function updateNumber() {
      numberEl.textContent = current + '+';

      if (direction === 1) {
        if (current < maxCount) {
          current = Math.min(current + step, maxCount);
          setTimeout(updateNumber, interval);
        } else {
          direction = -1;
          setTimeout(updateNumber, interval);
        }
      } else {
        if (current > target) {
          current = Math.max(current - step, target);
          setTimeout(updateNumber, interval);
        } else {
          numberEl.textContent = current + '+';
        }
      }
    }
    updateNumber();
  }

  // ===== OBSERVER TO TRIGGER ON SCROLL =====
  const observerOptions = {
    root: null,
    threshold: 0.5 // 50% visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reviewBlock.querySelectorAll('.review-item').forEach(startAnimation);
        obs.unobserve(entry.target); // Run once only
      }
    });
  }, observerOptions);

  observer.observe(reviewBlock);
});

