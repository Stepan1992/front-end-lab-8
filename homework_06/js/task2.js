function tableBuilder(obj) {
    let tBody = $('#table-body');
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let propertyName = key.replace(/_/gi, ' '),
                value = obj[key],
                td = $('<td></td>').text(value),
                text = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
                th = $('<th></th>').attr('scope', 'row').text(text),
                tr = $('<tr></tr>').append(th).append(td);
            tBody.append(tr);
        };
    };
    $('#data-table').css('display', 'block');
};

$('#track-btn').click(function () {
    let inpValue = $('#ip-inp').val(),
        ipapiUrl = `https://ipapi.co/${inpValue}/json/`;
    $('#table-body').html('');
    $('#validate-btn').css('display', 'none');
    $('#load-animation').css('display', 'block');
    http.get(ipapiUrl).then(function (responseJson) {
        $('#load-animation').css('display', 'none');
        tableBuilder(JSON.parse(responseJson));
        validation(responseJson);
        $('#validate-btn').css('display', 'inline-block');
    }).catch(function (error) {
        $('#load-animation').css('display', 'none');
        console.error(error);
    });
});

function validation(ipapiResponse) {
    $('#validate-btn').click(function () {
        $(this).css('display', 'none');
        $('#validate-animation').css('display', 'block');
        http.post('https://shrouded-garden-94580.herokuapp.com/', ipapiResponse)
            .then(function (response) {
                $('#validate-animation').css('display', 'none');
                $('#modal-text').text(response);
                $('#modal').modal('show');
            }).catch(function (error) {
                $('#validate-animation').css('display', 'none');
                $('#modal-text').text('Something went wrong. Try again!');
                $('#modal').modal('show');
                console.error(error);
            });
    });
};