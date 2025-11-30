const defaultImg = "https://i.imgur.com/OaH1q1F.png"; // pixel treasure box

let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];

function maskContact(contact){
    if(contact.length >= 6){
        return contact.slice(0,3) + "****" + contact.slice(-3);
    }
    return contact;
}

function saveItems(){
    localStorage.setItem("lostFoundItems", JSON.stringify(items));
}

function renderItems(filteredItems = null){
    const displayItems = filteredItems || items;
    const cardsDiv = document.getElementById("cards");
    cardsDiv.innerHTML = "";
    displayItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image || defaultImg}" alt="Item Image">
            <h3>${item.title}</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Date:</strong> ${item.date}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Contact:</strong> ${maskContact(item.contact)}</p>
        `;
        cardsDiv.appendChild(card);
    });
}

function addItem(){
    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const contact = document.getElementById("contact").value;
    const imageInput = document.getElementById("image");

    if(!title || !location || !contact){
        alert("Please fill Title, Location & Contact!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(){
        const newItem = {
            title, type, category, date, location, contact,
            image: reader.result || defaultImg
        };
        items.push(newItem);
        saveItems();
        renderItems();
        document.querySelector(".form").reset();
    }
    if(imageInput.files[0]){
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        reader.onload();
    }
}

// Filters & Search
document.getElementById("search").addEventListener("input", filterItems);
document.getElementById("filterType").addEventListener("change", filterItems);
document.getElementById("filterCategory").addEventListener("change", filterItems);
document.getElementById("filterDate").addEventListener("change", filterItems);

function filterItems(){
    const keyword = document.getElementById("search").value.toLowerCase();
    const typeFilter = document.getElementById("filterType").value;
    const categoryFilter = document.getElementById("filterCategory").value;
    const dateFilter = document.getElementById("filterDate").value;

    const filtered = items.filter(item => {
        return (
            item.title.toLowerCase().includes(keyword) &&
            (typeFilter === "" || item.type === typeFilter) &&
            (categoryFilter === "" || item.category === categoryFilter) &&
            (dateFilter === "" || item.date === dateFilter)
        );
    });
    renderItems(filtered);
}

// Initial render
renderItems();
