// Make a function that gets fired when the submit button is pressed
// Need to calculate the values and output them to the dom in a nice fashion
$('#submit').click(function (event) {
    // Avoids clearing the fields
    event.preventDefault();

    // Show the hidden output
    $("#output").toggleClass("visually-hidden");

    // How to grab the value
    alert(Number($('#CH1-5').val()));

    // TODO: Do the calculations

    // How to assign  the value
    $('#CH2-5').val('13');
    $('#O-CH2-5').val('13');
});