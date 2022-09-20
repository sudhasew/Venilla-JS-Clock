var hour = document.getElementById("hours");
var mins = document.getElementById("mins");
var secs = document.getElementById("secs");

var startBtn = document.getElementById("btnStart");
var pauseBtn = document.getElementById("btnPause");

startBtn.addEventListener("click", startClock);
pauseBtn.addEventListener("click", pauseClock);

var waitTimer;

var date = new Date();

function displayTime() {
  var date = new Date();
  var currentHour = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentSeconds = date.getSeconds();

  var ampm = currentHour >= 12 ? "PM" : "AM";

  currentHour = currentHour % 12;
  currentHour = currentHour ? currentHour : 12;

  hour.innerHTML = twoDigit(currentHour) + ":";
  mins.innerHTML = twoDigit(currentMinutes) + ":";
  secs.innerHTML = twoDigit(currentSeconds) + " " + ampm;
}

function twoDigit(digit) {
  if (digit < 10) {
    digit = "0" + digit;
  }
  return digit;
}

function startClock() {
  pauseClock();
  waitTimer = setInterval(displayTime, 100);
}

function pauseClock() {
  clearInterval(waitTimer);
}

// Toast Container

let toastContainer;

function generateToast({
  message = `Now Time is :${date}`,
  background = "#00214d",
  color = "#fffffe",
  length = "3000ms",
}) {
  toastContainer.insertAdjacentHTML(
    "beforeend",
    `<p class="toast" 
    style="background-color: ${background};
    color: ${color};
    animation-duration: ${length}">
   ${message}
  </p>`
  );
  const toast = toastContainer.lastElementChild;
  toast.addEventListener("animationend", () => toast.remove());
}

(function initToast() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="toast-container"></div>
  <style>
  .toast-container {
    position: fixed;
    top: 0;
    right: 0;
    display: grid;
    gap: 20px;
  }
  
  .toast {
    font-size: 1rem;
    font-weight: bold;
    border:1px solid black;
    line-height: 1;
    width:300px;
    text-align:center;
    padding: 10px 10px;
    background-color: lightblue;
    animation: toastIt 3000ms cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
  }
  
  @keyframes toastIt {
    0%,
    100% {
      transform: translateY(-150%);
      opacity: 0;
    }
    10%,
    90% {
      transform: translateY(0);
      opacity: 1;
    }
  }
    </style>
    `
  );
  toastContainer = document.querySelector(".toast-container");
})();

startBtn.addEventListener("click", (e) => {
  generateToast({
    message: e.currentTarget.dataset.message,
    background: "hsl(171 100% 46.1%)",
    color: "hsl(171 100% 13.1%)",
    length: "5000ms",
  });
});

pauseBtn.addEventListener("click", () => {
  generateToast({
    message: "⚠️ You paused the clock? ⚠️",
    background: "hsl(350 100% 66.5%)",
    color: "hsl(350 100% 13.5%)",
  });
});
