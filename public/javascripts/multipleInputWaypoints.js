// add row
$('#addRow').click(function () {
  var html = '';
  html += '<div id="inputFormRow">';
  html += '<div class="input-group mb-3">';
  html +=
    '<input type="text" name="locations" class="form-control m-input" placeholder="Enter waypoint" required autocomplete="off">';
  html += '<div class="input-group-append">';
  html += '<button id="removeRow" type="button" class="btn btn-danger mx-1">Remove</button>';
  html += '</div>';
  html += '</div>';

  $('#newRow').append(html);
});

// remove row
$(document).on('click', '#removeRow', function () {
  $(this).closest('#inputFormRow').remove();
});
