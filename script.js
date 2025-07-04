const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const input = document.querySelector('.search-box input');

// ➕ Handle Enter key press to trigger search
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search.click();
    }
});

search.addEventListener('click', () => {
    const APIKey = '15c5349dd93d3d9785791cf28d6a3ca9';
    const city = input.value.trim();

    if (city === '') return;
    if (cityHide.textContent === city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.classList.remove('large');
                container.classList.add('small');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            cityHide.textContent = city;
            container.classList.remove('small');
            container.classList.add('large');
            error404.classList.remove('active');

            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');

            void weatherBox.offsetWidth;
            void weatherDetails.offsetWidth;

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
        });
});
