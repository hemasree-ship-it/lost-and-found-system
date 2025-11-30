// This makes the "Add New Item" button create a new card
document.querySelector('button').addEventListener('click', function() {
    const container = document.querySelector('.container');

    // Create a new card
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `
        <h3>Lost: <span style="color:#ffcc00;">New Item</span></h3>
        <p>Location: <span style="color:#00ccff;">Unknown</span></p>
        <p>Contact: 000-000-0000</span></p>
    `;

    // Add it to the page
    container.appendChild(newCard);
});
