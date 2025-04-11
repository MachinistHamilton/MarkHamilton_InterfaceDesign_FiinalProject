document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".carousel-item");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");
  
    let current = 0;
  
    function updateCarousel() {
      const len = items.length;
  
      items.forEach((item, i) => {
        item.classList.remove("left2", "left", "center", "right", "right2");
  
        const offset = (i - current + len) % len;
  
        if (i === current) {
          item.classList.add("center");
        } else if (offset === 1 || offset === -len + 1) {
          item.classList.add("right");
        } else if (offset === 2 || offset === -len + 2) {
          item.classList.add("right2");
        } else if (offset === len - 1 || offset === -1) {
          item.classList.add("left");
        } else if (offset === len - 2 || offset === -2) {
          item.classList.add("left2");
        }
      });
  
      // 🔄 Reset styles for everything
      items.forEach((item) => {
        if (!item.classList.contains("left") &&
            !item.classList.contains("left2") &&
            !item.classList.contains("center") &&
            !item.classList.contains("right") &&
            !item.classList.contains("right2")) {
          item.style.opacity = "0";
          item.style.transform = "translateX(0) scale(0.7)";
          item.style.zIndex = "1";
        } else {
          item.style.opacity = "";
          item.style.transform = "";
          item.style.zIndex = "";
        }
      });
    }
  
    // 🔍 Modal logic
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
    });
  
    closeModal.onclick = () => {
      modal.style.display = "none";
    };
  
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  
    // 🔁 Start carousel
    updateCarousel();
    let interval = setInterval(() => {
      current = (current + 1) % items.length;
      updateCarousel();
    }, 3000);
  
    document.getElementById("fancyCarousel").addEventListener("mouseenter", () => clearInterval(interval));
    document.getElementById("fancyCarousel").addEventListener("mouseleave", () => {
      interval = setInterval(() => {
        current = (current + 1) % items.length;
        updateCarousel();
      }, 3000);
    });
  });
  