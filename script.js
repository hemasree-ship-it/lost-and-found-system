// Load saved items from localStorage
let items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];

function saveItem(e) {
    e.preventDefault();

    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const desc = document.getElementById('itemDescription').value;

    const newItem = {
        id: Date.now(),
        name,
        category,
        desc,
        found: false,
        finderDetails: null
    };

    items.push(newItem);
    localStorage.setItem('lostFoundItems', JSON.stringify(items));

    document.getElementById('itemForm').reset();
    renderItems();
}

function markFound(id) {
    const item = items.find(i => i.id === id);

    const finder = prompt("Enter your name (Finder):");
    const contact = prompt("Enter your contact:");

    item.found = true;
    item.finderDetails = { finder, contact };

    localStorage.setItem('lostFoundItems', JSON.stringify(items));
    renderItems();
}

function renderItems() {
    const board = document.getElementById('itemsBoard');
    board.innerHTML = '';

    items.forEach(i => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h3>${i.name}</h3>
            <p><b>Category:</b> ${i.category}</p>
            <p>${i.desc}</p>
            ${i.found ? `<p style='color:lightgreen;'>FOUND ✔<br>By: ${i.finderDetails.finder}</p>` : `<button onclick="markFound(${i.id})">Mark as Found</button>`}
        `;

        board.appendChild(card);
    });
}

renderItems();
