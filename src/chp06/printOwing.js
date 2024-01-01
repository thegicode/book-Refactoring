function printBanner(console) {
    console.log("******");
    console.log("** 고객 채무 **");
    console.log("******");
}

function printDetails(invoice, outstanding, console) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(Clock, invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 30
    );
}

function calculateOutstainding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
        result += o.amount;
    }
    return result;
}

export default function printOwing(invoice, console, Clock) {
    printBanner(console);

    let outstanding = calculateOutstainding(invoice);

    recordDueDate(Clock, invoice);

    printDetails(invoice, outstanding, console);
}
