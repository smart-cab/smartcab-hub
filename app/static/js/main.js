var today = new Date();
var time = ""
if (today.GetHours < 10) {
    time += "0"
}
time += today.getHours() + ":";
if (today.getMinutes() < 10) {
    time += "0"
}
time += today.getMinutes()

document.getElementById('date-time').innerHTML=time;