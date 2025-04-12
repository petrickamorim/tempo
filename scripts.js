async function buscarClima() {
  const cidade = document.getElementById("city").value;
  const apiKey = "1994bc38783dd087e379c868e50e51a5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      Swal.fire({
        icon: "error",
        title: "Cidade não encontrada",
        text: "Verifique o nome e tente novamente.",
        background: "#1e1e2f",
        color: "#fff",
        confirmButtonColor: "#8e44ad",
      });
      return;
    }

    document.getElementById("weather-card").style.display = "block";
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById(
      "temperatura"
    ).textContent = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById(
      "umidade"
    ).textContent = `💧 Umidade: ${data.main.humidity}%`;
    document.getElementById(
      "vento"
    ).textContent = `💨 Vento: ${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.querySelector(
      ".icon"
    ).innerHTML = `<img src="${iconUrl}" alt="Ícone do clima">`;

    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".details").style.display = "flex";
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    Swal.fire({
      icon: "error",
      title: "😢 Ops!",
      html: "Algo deu errado ao buscar a previsão.<br><b>Tente novamente mais tarde!</b>",
      background: "#ADD8E6",
      color: "#fff",
      confirmButtonColor: "#3498db",
      confirmButtonText: "OK",
    });
  }
}
