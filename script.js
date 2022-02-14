let first = true;
// Make a function that gets fired when the submit button is pressed
// Need to calculate the values and output them to the dom in a nice fashion
$('#submit').click(function (event) {
    // Avoids clearing the fields
    event.preventDefault();

    // Show the hidden output ONCE
    if(first){
        $("#output").toggleClass("visually-hidden");
        first=false;
    }

    // How to grab the value
    //alert(Number($('#CH1-5').val()));
    // document.write(num.toExponential(4));
    // How to assign  the value
    //$('#CH2-5').val('13');
    //$('#O-CH2-5').val('13');

    // Humic acid calculation
    let results = 2*$('#volume').val()/334.3;
    $('#HA').val(results.toFixed(3));

    // CH calculation
    let CHfields = [
        'CH1-5', 'CH2-5', 'CH3-5',
        'CH1-50', 'CH2-50', 'CH3-50',
        'CH1-200', 'CH2-200', 'CH3-200'
    ]
    CHfields.forEach(function (item, index) {
        let results = (100000*$('#volume').val())/$('#'+item).val();
        $('#O-'+item).val(results.toFixed(1));
    });

    // PS calculation
    let PSfields = [
        'PS1-5', 'PS2-5', 'PS3-5',
        'PS1-50', 'PS2-50', 'PS3-50',
        'PS1-200', 'PS2-200', 'PS3-200'
    ]
    PSfields.forEach(function (item, index) {
        let results = (300000*$('#volume').val())/$('#'+item).val();
        $('#O-'+item).val(results.toFixed(1));
    });

    // Total calculation
    let Tfields = [
        '1-5', '2-5', '3-5',
        '1-50', '2-50', '3-50',
        '1-200', '2-200', '3-200'
    ]
    Tfields.forEach(function (item, index) {
        let results = parseInt($('#O-CH'+item).val()) + parseInt($('#O-PS'+item).val());
        $('#TV'+item).val(results.toFixed(1));
    });
});