class Flight {
    static Items = [];

    constructor(seatNum, flightNum, departureAirport, arrivalAirport, travelDate) {
        this.seatNum = seatNum;
        this.flightNum = flightNum;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.travelDate = travelDate;
        Flight.Items.push(this); 
    }

    static displayAll() {
        console.log('All Flight Tickets:');
        Flight.Items.forEach(ticket => {
            console.log('------------------------------------');
            ticket.displayTicket();
        });
        console.log('------------------------------------');
    }

    displayTicket() {
        console.log('Flight Ticket Information:');
        console.log(`Seat Number: ${this.seatNum}`);
        console.log(`Flight Number: ${this.flightNum}`);
        console.log(`Departure Airport: ${this.departureAirport}`);
        console.log(`Arrival Airport: ${this.arrivalAirport}`);
        console.log(`Travel Date: ${this.travelDate}`);
    }

    updateTicket(updatedInfo) {
        Object.assign(this, updatedInfo);
    }
}

module.exports = Flight;
