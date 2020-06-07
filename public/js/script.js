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
});
