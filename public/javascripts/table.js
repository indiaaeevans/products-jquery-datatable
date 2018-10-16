$(document).ready(function () {
  // overrides default error handling behavior,
  // which is to show an alert
  $.fn.dataTable.ext.errMode = 'none';

  var table = $("#products-table");

  table.on("error.dt", function (e, settings, techNote, message) {
      console.log("An error has been reported by DataTables: ", message);
    }).DataTable({
      processing: true,
      serverSide: true,
      ordering: false,
      dom: '<"top"il>rt<"bottom"p>',
      ajax: "/api/rows",
      columns: [{
        data: "id"
      }, {
        data: "name"
      }, {
        data: "price"
      }, {
        data: "rating"
      }],
      lengthMenu: [10, 25, 50, 100]
    })
});