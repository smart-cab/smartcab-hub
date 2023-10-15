const _DateAndTime = () => {
  document.querySelector("#currentTime").innerHTML = new Date().toLocaleTimeString('en-gb', {hour: 'numeric', minute: 'numeric', hour12: false});
}
setInterval(_DateAndTime, 1000);
_DateAndTime();

const _Humidity = () => {
  document.querySelector("#currentHumidity").innerHTML = "98%";
}
_Humidity();

const _Temperature = () => {
  document.querySelector("#currentTemperature").innerHTML = "20°";
}
_Temperature();

function updateDynamicContent() {
    $.ajax({
        url: '/get_temp',  // Flask route URL
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#dynamic-content').text('Value: ' + "sii");
        },
        error: function() {
            console.error('Error fetching data.');
        }
    });
}

updateDynamicContent();
setInterval(updateDynamicContent, 1000);  
