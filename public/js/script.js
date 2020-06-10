$(document).ready(function () {
  $("#generate-report").click(function () {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://" + window.location.host + "/inventory/inventoryDetails",
      success: function (data, status) {
        function getRandomColor() {
          var letters = "0123456789ABCDEF".split("");
          var color = "#";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        const randomcolors = [];
        for (var i = 0; i <= data.length; i++) {
          randomcolors.push(getRandomColor());
        }
        const productname = data.map((product) => product.ProductName);
        const quantity = data.map((product) => product.Quantity);

        let canvasProfile = document
          .getElementById("product-profile")
          .getContext("2d");
        let profileLineChart = new Chart(canvasProfile, {
          type: "pie",
          data: {
            labels: productname,
            datasets: [
              {
                data: quantity,
                backgroundColor: randomcolors,
              },
            ],
          },
          options: {},
        });
      },
    });
  });

  $("#subscribe").popover({
    title: "<h4>Create a Category</h4>",
    container: "body",
    placement: "bottom",
    sanitize: false,

    html: true,
    content: function () {
      return $("#popover-form").html();
    },
  });
  $("#ordertable").DataTable();
  $("#inventory-table").DataTable();
  $("#completedorder").DataTable();

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
  $('[data-toggle="popover-phone"]').popover({
    container: "body",
    title: "Update your profile",
    html: true,
    placement: "bottom",
    sanitize: false,
    content: function () {
      return $("#profile-phone").html();
    },
  });

  $('[data-toggle="popover-bio"]').popover({
    container: "body",
    title: "Update your profile",
    html: true,
    placement: "bottom",
    sanitize: false,
    content: function () {
      return $("#profile-bio").html();
    },
  });
});
