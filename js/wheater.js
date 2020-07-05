var temperatures = [-11.2, 9.4, 11.0, 17.0, 21.7, 28.2, 31.1];
var temperatureUpperLimits = [0,10,20,30,50];
var offers = ["Fűtsd fel magad isteni forrócsokinkkal!",
"Melegedj egy teával nálunk!",
"Egy finom süti biztos jól esne!",
"A fagyink lehűt!",
"Hűtsd le magad jéghideg kézművesd limonádénkkal!"];


function weatherWidget() {      
    var day = document.getElementById("day").value
    var temperatureDiv = document.getElementById("temperature");
    temperatureDiv.innerHTML = temperatures[day] + '&deg;C';
    for (let i = 0; i < temperatureUpperLimits.length; i++) {
        var upTemp = temperatureUpperLimits[i];
        document.getElementById("testing1").innerHTML = i;
        document.getElementById("testing2").innerHTML = upTemp;
        if (temperatures[day] <= upTemp) {
            document.getElementById("offers").innerHTML = offers[i];
            break;
        }
           
    }
}
