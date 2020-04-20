var active = document.querySelector(".active");
var loginbtn = document.getElementById("to-login");
var signupbtn = document.getElementById("to-signup");
var activ = document.querySelector(".activ");

signupbtn.addEventListener("click", function () {
  active.classList.replace("active", "activ");
  activ.classList.replace("activ", "active");
});
loginbtn.addEventListener("click", function () {
  activ.classList.replace("active", "activ");
  active.classList.replace("activ", "active");
});
