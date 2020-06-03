$(document).ready(function () {
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
