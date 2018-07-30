var socket = io();
var label = $('small');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desktop = searchParams.get('escritorio');

$('h1').text('Escritorio ' + desktop);

$('button').on('click', function() {

    socket.emit('answerTicket', { desktop: desktop }, function(res) {
        if (res === 'No hay tickets') {
            label.text('ninguno');
            alert(res);
            return;
        }
        label.text('ticket ' + res.number);
    });
});