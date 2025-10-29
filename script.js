// script.js — tương tác nhẹ, menu mobile, animation nhỏ
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'rgba(255,255,255,0.96)';
      nav.style.padding = '12px';
      nav.style.borderRadius = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '20px';
      nav.style.top = '64px';
      nav.style.boxShadow = '0 12px 28px rgba(10,20,60,0.10)';
    }
  });

  // auto-close mobile nav on link click
  document.querySelectorAll('#nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) nav.style.display = '';
    });
  });

  // simple reveal on scroll
  const revealElements = document.querySelectorAll('.soft, .project-card, .skill-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        entry.target.style.transition = 'all 700ms cubic-bezier(.2,.9,.2,1)';
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => {
    el.style.transform = 'translateY(20px)';
    el.style.opacity = '0';
    observer.observe(el);
  });

  // === Weather API (OpenWeatherMap) ===
  const iconEl = document.getElementById("weather-icon");
  const tempEl = document.getElementById("weather-temp");
  const descEl = document.getElementById("weather-desc");
  const widgetEl = document.getElementById("weather-widget");

  const apiKey = "dc3825065d9c378a7c65cd7e1656fe03"; // OpenWeatherMap key
  const city = "Ho Chi Minh City";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;

      tempEl.textContent = `${temp}°C`;
      descEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
      iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      widgetEl.classList.add("show");

      // Nếu là ban đêm, thêm class night
      if (iconCode.endsWith("n")) {
        widgetEl.classList.add("night");
      }
    })
    .catch(err => {
      console.error("Lỗi fetch thời tiết:", err);
      tempEl.textContent = "N/A";
      descEl.textContent = "Không tải được";
      iconEl.src = "./icons/default.png";
      widgetEl.classList.add("show");
    });
});