// This makes the "Add New Item" button create an editable card
document.querySelector('#addItem').addEventListener('click', function() {
    const container = document.querySelector('.container');

    const newCard = document.createElement('div');
    newCard.className = 'card';

    newCard.innerHTML = `
        <label>Item Lost:</label>
        <input type="text" placeholder="Enter item name">

        <label>Location:</label>
        <input type="text" placeholder="Enter location">

        <label>Contact:</label>
        <input type="text" placeholder="Phone number">

        <button class="saveBtn">Save</button>
    `;

    container.appendChild(newCard);
});
