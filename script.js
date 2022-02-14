function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

let CHfields = [
    'CH1-5', 'CH2-5', 'CH3-5',
    'CH1-50', 'CH2-50', 'CH3-50',
    'CH1-200', 'CH2-200', 'CH3-200'
]
let PSfields = [
    'PS1-5', 'PS2-5', 'PS3-5',
    'PS1-50', 'PS2-50', 'PS3-50',
    'PS1-200', 'PS2-200', 'PS3-200'
]
let Tfields = [
    '1-5', '2-5', '3-5',
    '1-50', '2-50', '3-50',
    '1-200', '2-200', '3-200'
]
let first = true;

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
    CHfields.forEach(function (item, index) {
        let results = (100000*$('#volume').val())/$('#'+item).val();
        $('#O-'+item).val(results.toFixed(1));
    });

    // PS calculation
    PSfields.forEach(function (item, index) {
        let results = (300000*$('#volume').val())/$('#'+item).val();
        $('#O-'+item).val(results.toFixed(1));
    });

    // Total calculation
    Tfields.forEach(function (item, index) {
        let results = parseInt($('#O-CH'+item).val()) + parseInt($('#O-PS'+item).val());
        $('#TV'+item).val(results.toFixed(1));
    });
});

$('#download').click(function (event) {
    let today = new Date().toISOString().slice(0, 10)
    let value = 'FIELD,INPUT,OUTPUT\n';

    CHfields.forEach(function (item, index) {
        value += `${item},${$('#'+item).val()},${$('#O-'+item).val()}\n`;
    });
    PSfields.forEach(function (item, index) {
        value += `${item},${$('#'+item).val()},${$('#O-'+item).val()}\n`;
    });
    Tfields.forEach(function (item, index) {
        value += `TotalVolume${item},,${$('#TV'+item).val()}\n`;
    });
    value += `HumicAcid,,${$('#HA').val()}\n`;
    value += `Volume,${$('#volume').val()},\n`;

    download('data-'+today+'.txt', value);
});