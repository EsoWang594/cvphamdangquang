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

  // === Weather API ===
  const iconEl = document.getElementById("weather-icon");
  const tempEl = document.getElementById("weather-temp");
  const descEl = document.getElementById("weather-desc");
  const widgetEl = document.getElementById("weather-widget");

  const apiKey = "kydb55klq3w7h67ibhqti8wn0wa5ghgwrap8ysm4";
  const lat = "10.7769";
  const lon = "106.7009";

  const weatherIcons = {
    clear: "sun.png",
    partly_cloudy: "partly_cloudy.png",
    cloudy: "cloud.png",
    overcast: "overcast.png",
    fog: "fog.png",
    light_rain_showers: "light_rain.png",
    rain_showers: "rain.png",
    heavy_rain_showers: "heavy_rain.png",
    light_snow_showers: "light_snow.png",
    snow_showers: "snow.png",
    thunderstorm: "thunder.png",
    thunderstorm_with_rain: "storm_rain.png",
    clear_night: "moon.png",
    partly_cloudy_night: "moon_cloud.png"
  };

  const url = `https://api.meteosource.com/v1/free/point?lat=${lat}&lon=${lon}&key=${apiKey}&fields=temperature_2m,weather_code`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const code = data.weather_code;
      const temp = data.temperature_2m;
      const iconFile = weatherIcons[code] || "default.png";

      iconEl.src = `./icons/${iconFile}`;
      tempEl.textContent = `${temp}°C`;
      descEl.textContent = code.replace(/_/g, " ").toUpperCase();

      // Hiển thị widget với hiệu ứng
      widgetEl.classList.add("show");

      // Nếu là ban đêm, thêm class night
      if (code.includes("night")) {
        widgetEl.classList.add("night");
      }
    })
    .catch(err => {
      console.error("Lỗi fetch weather:", err);
      tempEl.textContent = "N/A";
      descEl.textContent = "Không tải được";
      iconEl.src = "./icons/default.png";
      widgetEl.classList.add("show");
    });
});