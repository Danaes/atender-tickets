const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.last += 1;
        console.log(`Ticket ${ this.last }`);

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.writeFile();

        return `Ticket ${ this.last }`;
    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    getLast4Ticket() {
        return this.last4;
    }

    answerTicket(desktop) {

        if (this.tickets.length === 0)
            return 'No hay tickets';

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift(); //elimina la primera posicion

        let answerTicket = new Ticket(ticketNumber, desktop);

        this.last4.unshift(answerTicket); //añadir al inicio del array

        if (this.last4.length > 4)
            this.last4.splice(-1, 1); //borra el ultimo elemento

        this.writeFile();

        return answerTicket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        console.log('Se ha inicializado el sistema');
        this.writeFile();
    }

    writeFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
};