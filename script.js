document.getElementById("addItemBtn").addEventListener("click", function () {
    const container = document.getElementById("cardContainer");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3 contenteditable="true">Lost: <span contenteditable="true" style="color:#ffcc00;">New Item</span></h3>
        <p contenteditable="true">Location: <span contenteditable="true" style="color:#00ccff;">Unknown</span></p>
        <p contenteditable="true">Contact: <span contenteditable="true">000-000-0000</span></p>
    `;

    container.appendChild(card);
});

