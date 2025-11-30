document.getElementById("addItemBtn").addEventListener("click", function() {
    const container = document.querySelector('.container');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `
        <h3 contenteditable="true">Lost: <span style="color:#ffcc00;">New Item</span></h3>
        <p contenteditable="true">Location: <span style="color:#00ccff;">Unknown</span></p>
        <p contenteditable="true">Contact: 000-000-0000</p>
    `;

    container.appendChild(newCard);
});
