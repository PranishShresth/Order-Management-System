$(document).ready(function () {
  $("#ordertable").DataTable();

  $("#customertable").DataTable({
    buttons: [
      {
        extend: "copy",
        text: "Copy to clipboard",
      },
      "excel",
      "pdf",
    ],
  });

  const btn = document.getElementById("feedbackBTN");
  const social_panel = document.querySelector(".social-container");
  btn.addEventListener("click", () => {
    social_panel.classList.toggle("visible");
  });
});
