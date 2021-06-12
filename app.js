window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temperature-description");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempDegree = document.querySelector(".temperature-degree");
  let tempSection = document.querySelector(".temperature");
  let tempSectionSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //   const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude={minutely,hourly,daily,alerts}&appid=b3b31f07568f52e9052b918c337ded0a`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temp, weather } = data.current;
          const icon = weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const image = document.getElementById("icon-zone");
          image.src = iconUrl;

          tempDegree.textContent = temp;
          tempDescription.textContent = weather[0].description;
          locationTimezone.textContent = data.timezone;

          tempSection.addEventListener("click", () => {
            if (tempSectionSpan.textContent === "°F") {
              const tempC = ((temp - 32) * (5 / 9)).toFixed(2);

              return (
                (tempSectionSpan.textContent = "°C"),
                (tempDegree.textContent = tempC)
              );
            } else {
              return (
                (tempSectionSpan.textContent = "°F"),
                (tempDegree.textContent = temp)
              );
            }
          }); //Set Dom elements from the API
        });
    });
  }
});
