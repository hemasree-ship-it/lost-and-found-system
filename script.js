document.getElementById("addItemBtn").addEventListener("click", function() {
    const container = document.querySelector('.container');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `
        <h3>Lost: <span style="color:#ffcc00;">New Item</span></h3>
        <p>Location: <span style="color:#00ccff;">Unknown</span></p>
        <p>Contact: 000-000-0000</p>
    `;

    container.appendChild(newCard);
});
