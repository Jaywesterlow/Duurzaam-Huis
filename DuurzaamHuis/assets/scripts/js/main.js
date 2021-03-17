//  *SIDE BAR & MENU ICON ---------------------------------------------------
const menuIconEl = $(".menu-icon");
const sidenavEl = $(".sidenav");
const sidenavCloseEl = $(".sidenav__close-icon");

// Add and remove provided class names
function toggleClassName(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

menuIconEl.on("click", function () {
  toggleClassName(sidenavEl, "active");
});

sidenavCloseEl.on("click", function () {
  toggleClassName(sidenavEl, "active");
});

// *DARKMODE BUTTON -----------------------------------------------------
var toggleDarkmode = document.querySelector(".toggle-btn input");

// console.log(toggleDarkmode);

toggleDarkmode.addEventListener("click", toggleDarkmodeAppearance);

function toggleDarkmodeAppearance() {
  if (toggleDarkmode.checked == true) {
    document.querySelector("body").classList.remove("lightmode");
  } else {
    document.querySelector("body").classList.add("lightmode");
  }
}

// *TIJD WIDGET --------------------------------------------------------
function TijdDatumLocatie() {
  setInterval(function () {
    let time = new Date();
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let hr = time.getHours();
    let day = " AM";
    if (hr > 12) {
      day = " PM";
      hr = hr - 12;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (hr < 10) {
      hr = "0" + hr;
    }
    clockdisplay(hr, min, sec, day);
  }, 100);

  function clockdisplay(hr, min, sec, day) {
    let clock = document.getElementById("display");
    clock.innerHTML = hr + ":" + min + ":" + sec + "" + day;
  }

  var now = new Date();

  var days = new Array(
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag"
  );

  var months = new Array(
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December"
  );

  var date = (now.getDate() < 10 ? "0" : "") + now.getDate();

  function fourdigits(number) {
    return number < 1000 ? number + 1900 : number;
  }
  today =
    days[now.getDay()] +
    ", " +
    date +
    " " +
    months[now.getMonth()] +
    " " +
    fourdigits(now.getYear());

  var dag = document.getElementById("dagmaandjaar");
  dag.innerHTML = today;
  var place = Intl.DateTimeFormat().resolvedOptions().timeZone;
  plek = document.getElementById("places");
  plek.innerHTML = place;
}

// To do list alles
$(".txtb").on("keyup", function (e) {
  //13  means enter button
  if (e.keyCode == 13 && $(".txtb").val() != "") {
    var task = $("<div class='task'></div>").text($(".txtb").val());
    var del = $("<i class='fas fa-trash-alt'></i>").click(function () {
      var p = $(this).parent();
      p.fadeOut(function () {
        p.remove();
      });
    });

    var check = $("<i class='fas fa-check'></i>").click(function () {
      var p = $(this).parent();
      p.fadeOut(function () {
        $(".comp").append(p);
        p.fadeIn();
      });
      $(this).remove();
    });

    task.append(del, check);
    $(".notcomp").append(task);
    //to clear the input
    $(".txtb").val("");
  }
});

//einde to do list

// Begin Weer
let weer = document.getElementById("city");
let weerdescription = document.getElementById("weatherdescription");
let temperatuur = document.getElementById("temperature");


if (navigator.geolocation) {
  //Return the user's longitude and latitude on page load using HTML5 geolocation API
  window.onload = function () {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  };
}



function getCurrentLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;


  weer.innerHTML = '';
  weerdescription.innerHTML = '';
  temperatuur.innerHTML = '';


  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&APPID=b7aaa3a349294d5706002e82df3de1ea&units=metric",
    function (data) {
      $(".city")[0].append(data.name + " ");
      $(".temperature")[0].append(data.main.temp + "°C");
      $(".weatherdescription")[0].append(data.weather[0].description + " ");
    }
  );
}

// Einde weer

window.addEventListener("DOMContentLoaded", TijdDatumLocatie);
