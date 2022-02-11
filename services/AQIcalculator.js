const aqiCalculator = require("aqi-calculator");
function calculate(x){
    const DATA = [x];

    const AQI = aqiCalculator(DATA);
    console.log(AQI);
    return AQI
}

module.exports = {calculate}