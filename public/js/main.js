
  // Initialize collapse button
  $(".brand-logo").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  
  $(document).ready(function() {
    $('select').material_select();
  });

  $('select').material_select('destroy');
         

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  var table = $('#example').DataTable({});
        $('select').material_select();