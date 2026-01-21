
function toDate(dStr, format) {
    var now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0, dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setSeconds(0);
        return now;
    } else
        return "Invalid Format";
}

function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function DateFormat(date) {
    var days = date.getDate();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = days + '/' + month + '/' + year + '/ ' + hours + ':' + minutes;
    return strTime;
}

function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function formatTime(milliseconds) {
    // Create a Date object using milliseconds
    var date = new Date(milliseconds);

    // Get hours and minutes
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // Convert hours to 12-hour format
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Add leading zeros to minutes if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Concatenate hours, minutes, and am/pm marker
    var formattedTime = hours + ':' + minutes + ' ' + ampm;

    return formattedTime;
}


async function fillTheTitle() {
    try {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var today = day + "-" + month + "-" + year;

        const response = await fetch("https://api.aladhan.com/v1/timingsByCity/" + today + "?city=Toronto&country=Canada&method=2&school=1");
        const post = await response.json();
        const data = post.data;
        const timings = data.timings;

        document.getElementById("fajrstart").innerText = tConvert(timings.Fajr);
        document.getElementById("zuhrstart").innerText = tConvert(timings.Dhuhr);
        document.getElementById("juma1start").innerText = tConvert(timings.Dhuhr);
        document.getElementById("juma2start").innerText = tConvert(timings.Dhuhr);
        document.getElementById("asrstart").innerText = tConvert(timings.Asr);
        document.getElementById("magribstart").innerText = tConvert(timings.Maghrib);
        document.getElementById("ishastart").innerText = tConvert(timings.Isha);
        document.getElementById("ishastart1").innerText = tConvert(timings.Isha);
    } catch (error) {
        console.error("Error fetching prayer times:", error);
    }
}

fillTheTitle();
