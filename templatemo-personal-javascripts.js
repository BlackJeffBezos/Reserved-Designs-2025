// JavaScript Document


        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

  // ✅ Trigger when visible (mobile-friendly)
  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.number').forEach(countUp);
        obs.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.3 }); // 30% visible triggers on tablets/mobiles too

  statsObserver.observe(document.querySelector('#stats'));
    // Count up function
    function countUp(element) {
        const target = +element.getAttribute('data-target');
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        let count = 0;

        const timer = setInterval(() => {
            count += 1;
            element.textContent = count;
            if (count === target) {
                clearInterval(timer);
            }
        }, stepTime);
    }

          function toggleDropdown(event) {
    event.preventDefault();
    const parent = event.target.closest('.dropdown');
    parent.classList.toggle('open');
  }

  // Optional: Close the dropdown if you click outside
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown').forEach(drop => {
      if (!drop.contains(e.target)) {
        drop.classList.remove('open');
      }
    });
});

        // Enhanced form submission with better UX
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
            
            // Simulate form submission with better feedback
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Show success animation
                submitBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    submitBtn.style.transform = 'scale(1)';
                }, 200);
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    document.querySelector('.contact-form').reset();
                }, 3000);
            }, 2000);
        });

        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Infinite loop scroll
const scrollContainer = document.getElementById('wcuScroll');
const blocks = Array.from(scrollContainer.children);
scrollContainer.innerHTML += scrollContainer.innerHTML; // duplicate content for looping

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});
scrollContainer.addEventListener('mouseleave', () => isDown = false);
scrollContainer.addEventListener('mouseup', () => isDown = false);
scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1; // scroll speed
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// reset scroll when reaching half (for infinite loop)
scrollContainer.addEventListener('scroll', () => {
  const scrollWidth = scrollContainer.scrollWidth / 2;
  if (scrollContainer.scrollLeft >= scrollWidth) {
    scrollContainer.scrollLeft = 0;
}
});

