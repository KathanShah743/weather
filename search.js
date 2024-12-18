let prompt = [
    'Mumbai',
    'New Delhi',
    'Bengaluru',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Indore'
]

const result = document.querySelector(".result");
const report = document.querySelector(".report");
const inputBox = document.getElementById("input-box");
const loc = document.querySelector(".loc");
const temp = document.querySelector(".temp");
const prec = document.querySelector(".prec");
const upd = document.querySelector(".upd");
const img = document.querySelector(".logoimg");
const hum = document.querySelector(".hum");
const wind = document.querySelector(".wind");

inputBox.onkeyup = function () {
    let results = [];
    let input = inputBox.value;
    if (input.length) {
        results = prompt.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(results);
    if (!results.length) {
        result.innerHTML = '';
    }
}

function display(results) {
    const content = results.map((list) => {
        return "<li onclick=disp(this)>" + list + "</li>";
    });
    result.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function disp(list) {
    inputBox.value = list.innerHTML;
    result.innerHTML = '';
}

function search() {
    report.style.display = "flex";
    const city = inputBox.value;
    const link = 'https://api.weatherapi.com/v1/forecast.json?key=6d84be9a356b419394e95939241712&q='+city+'&days=1&aqi=no&alerts=no';
    fetch(link)
    .then(response => response.json())
    .then(data => {
        if(data.error) alert(data.error.message);
        loc.innerHTML = data.location.name + ", " + data.location.region + ", " + data.location.country;
        temp.innerHTML = data.current.temp_c + "°C, " + data.current.condition.text;
        prec.innerHTML = data.current.precip_mm + "mm";
        hum.innerHTML = data.current.humidity;
        wind.innerHTML = data.current.wind_kph + "km/hr " + data.current.wind_dir;
        upd.innerHTML = data.current.last_updated + " (local time)";
        img.innerHTML = "<img src='https:"+data.current.condition.icon+"'>"
    }
    )
}
