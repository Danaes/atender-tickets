// Comando para establecer la comunicacion
var socket = io();

var labelTicket1 = $('#lblTicket1');
var labelTicket2 = $('#lblTicket2');
var labelTicket3 = $('#lblTicket3');
var labelTicket4 = $('#lblTicket4');

var labelEscritorio1 = $('#lblEscritorio1');
var labelEscritorio2 = $('#lblEscritorio2');
var labelEscritorio3 = $('#lblEscritorio3');
var labelEscritorio4 = $('#lblEscritorio4');

var lblTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4];
var lblDesktops = [labelEscritorio1, labelEscritorio2, labelEscritorio3, labelEscritorio4];

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

socket.on('actualTicket', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.last4);

});

function updateHTML(last4) {
    for (var i = 0; i <= last4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblDesktops[i].text('Escritorio ' + last4[i].desktop);
    }
}