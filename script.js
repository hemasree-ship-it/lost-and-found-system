const defaultImg = "https://i.imgur.com/OaH1q1F.png"; // pixel treasure box

// Load existing items from localStorage
let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];

// Mask phone numbers like 987****321
function maskContact(contact){
    if(contact.length >= 6){
        return contact.slice(0,3) + "****" + contact.slice(-3);
    }
    return contact;
}

// Save items to localStorage
function saveItems(){
    localStorage.setItem("lostFoundItems", JSON.stringify(items));
}

// Render items/cards
function renderItems(filteredItems = null){
    const displayItems = filteredItems || items;
    const cardsDiv = document.getElementById("cards");
    cardsDiv.innerHTML = "";

    displayItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card show"; // triggers pop animation
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

// Add new item (fixed image upload)
function addItem(){
    const title = document.getElementById("title").value;
    /* other fields... */
    const imageInput = document.getElementById("image");

    if(!title || !location || !contact){
        alert("Please fill Title, Location & Contact!");
        return;
    }

    const handleNewItem = (imgSrc) => {
        const newItem = { title, type, category, date, location, contact, image: imgSrc };
        items.push(newItem);
        saveItems();
        renderItems();
        document.querySelector(".form").reset();
        imageInput.value = ""; // <-- clear file input
    };

    if(imageInput.files && imageInput.files[0]){
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(){
            handleNewItem(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        handleNewItem(defaultImg);
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



