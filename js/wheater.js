var temperatures = [-11.2, 9.4, 13.0, 17.0, 21.7, 28.2, 31.1];
var temperatureUpperLimits = [0,10,20,30,50];
var offers = ["Fűtsd fel magad isteni forrócsokinkkal!",
"Melegedj egy teával nálunk!",
"Egy finom süti biztos jól esne!",
"A fagyink lehűt!",
"Hűtsd le magad jéghideg kézművesd limonádénkkal!"];

function weatherWidget() {      
    var day = document.getElementById("day").value
    let temper = temperatures[day]
    console.log("temper 2 = ",temper)
    document.getElementById("temperature").innerHTML =`${temper}&deg;C`;
    for (let i = 0; i < temperatureUpperLimits.length; i++) {
        var upTemp = temperatureUpperLimits[i];
        if (temperatures[day] <= upTemp) {
            document.getElementById("offers").innerHTML = offers[i];
            break;
        }       
    }
}


let weatherMath = {
    min:  -100,
    max: +100,
    average: 0,

    weatherMin: function WaetherMinim(temprArray=[0,0,0]) {
        let min = temprArray[0]
        for (const tempMoment of temprArray) {
            min = (tempMoment < min) ? min = tempMoment : min = min
            // console.log(tempMoment)
        }
        this.min = min.toFixed(2)
        // console.log("min", this.min)
    },
    weatherMax: function weatherMaxim(temprArray=[0,0,0]) {
        let max = temprArray[0]
        for (const tempMoment of temprArray) {
            max = (tempMoment > max) ? max = tempMoment : max = max
            // console.log(tempMoment)
        }
        this.max = max.toFixed(2)
        // console.log("max", this.max)
    },
    weatherAverage: function weatherAver(temprArray=[0,0,0]) {
        let tempAkkuSum = 0
        for (const tempMoment of temprArray) {
            tempAkkuSum += tempMoment
            // console.log(tempAkkuSum)
        }
        let average = (tempAkkuSum/ temprArray.length) 
        this.average = average.toFixed(2)
        // console.log("average", this.average)
    },
    displayMin: function dispMin(params) {
        document.getElementById("minim").innerHTML = this.min + '&deg;C';
    },
    displayMax: function dispMax(params) {
        document.getElementById("maxim").innerHTML = this.max + '&deg;C';
    },
    displayAverage: function dispAver(params) {
        document.getElementById("average").innerHTML = this.average + '&deg;C';
    },
    
};

function callWeatherMath(temper) {
    var unitD = document.getElementById("radioC").checked
    console.log("unitD: " , unitD)
    if unitD == false {
        console.log("NA")
        /* for (let i = 0; i < temper.length; i++) {
            const element = temper[i];
            console.log(i, " " ,element)
        } */
    } 
    weatherWidget()
    weatherMath.weatherMin(temper);
    weatherMath.weatherMax(temper);
    weatherMath.weatherAverage(temper);
    weatherMath.displayMin();
    weatherMath.displayMax();
    weatherMath.displayAverage()
}
callWeatherMath(temperatures)