const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const menu = {
    coffee: 3.0,
    latte: 4.0,
    cappuccino: 4.5,
    espresso: 2.5,
    tea: 2.0,
};

let order = [];
let total = 0;

function displayMenu() {
    console.log('Welcome to Paik\'s Coffee Shop!');
    console.log('Here is our menu:');
    for (const [item, price] of Object.entries(menu)) {
        console.log(`${item}: $${price.toFixed(2)}`);
    }
    console.log('Type "done" to finish your order.');
}

function takeOrder() {
    rl.question('What would you like to order? ', (input) => {
        const item = input.toLowerCase();
        if (item === 'done') {
            finishOrder();
        } else if (menu[item]) {
            order.push(item);
            total += menu[item];
            console.log(`${item} added to your order. Total: $${total.toFixed(2)}`);
            takeOrder();
        } else {
            console.log('Sorry, we don\'t have that item. Please choose from the menu.');
            takeOrder();
        }
    });
}

function finishOrder() {
    console.log('\nYour order summary:');
    const summary = order.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
    for (const [item, quantity] of Object.entries(summary)) {
        console.log(`${item} x${quantity}`);
    }
    console.log(`Total: $${total.toFixed(2)}`);
    console.log('Thank you for your order!');
    rl.close();
}

displayMenu();
takeOrder();