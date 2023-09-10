const _DateAndTime = () => {
  document.querySelector("#currentTime").innerHTML = new Date().toLocaleTimeString('en-gb', {hour: 'numeric', minute: 'numeric', hour12: false});
}
setInterval(_DateAndTime, 60000);
_DateAndTime();
/*
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
*/
