// Load items from storage
let items = JSON.parse(localStorage.getItem("minecraftItems")) || [];

// Add new item
function addItem() {
    let type = document.getElementById("typeSelect").value;
    let itemName = document.getElementById("itemName").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location").value;
    let contact = document.getElementById("contact").value;
    let imageFile = document.getElementById("imageInput").files[0];

    if (!itemName || !location || !contact) {
        alert("Fill all required fields!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function () {
        let newItem = {
            id: Date.now(),
            type,
            itemName,
            category,
            date,
            location,
            contact,
            image: reader.result,
            foundDetails: null
        };

        items.push(newItem);
        localStorage.setItem("minecraftItems", JSON.stringify(items));
        renderItems();
    };

    if (imageFile) reader.readAsDataURL(imageFile);
    else {
        // default treasure box image
        reader.onload({ target: { result: "https://i.imgur.com/TXnokUg.png" } });
    }
}

// Mark item as found
function markFound(id) {
    let finder = prompt("Your Name:");
    let contact = prompt("Your Contact:");

    let item = items.find(i => i.id === id);
    item.foundDetails = { finder, contact };

    localStorage.setItem("minecraftItems", JSON.stringify(items));
    renderItems();
}

// Display cards
function renderItems() {
    let board = document.getElementById("board");
    board.innerHTML = "";

    items.forEach(i => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${i.image}">
            <h3>${i.type.toUpperCase()}: ${i.itemName}</h3>
            <p><b>Category:</b> ${i.category}</p>
            <p><b>Date:</b> ${i.date}</p>
            <p><b>Location:</b> ${i.location}</p>
            <p><b>Contact:</b> ${i.contact}</p>
            ${
                i.foundDetails
                ? `<p style='color:lightgreen;'>FOUND ✔ By: ${i.foundDetails.finder}</p>`
                : `<button onclick="markFound(${i.id})">Mark as Found</button>`
            }
        `;

        board.appendChild(card);
    });
}

renderItems();
