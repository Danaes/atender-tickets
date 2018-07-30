const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        callback(next);
    });

    client.emit('actualTicket', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4Ticket()
    });

    client.on('answerTicket', (data, callback) => {
        if (!data.desktop)
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });

        let answerTicket = ticketControl.answerTicket(data.desktop);
        callback(answerTicket);

        client.broadcast.emit('actualTicket', {
            last4: ticketControl.getLast4Ticket()
        });
    });
});