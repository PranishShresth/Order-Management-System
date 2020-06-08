$(document).ready(function () {
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
