let items = JSON.parse(localStorage.getItem("items")) || [];
let currentIndex = null;

const addBtn = document.getElementById("addBtn");
const container = document.getElementById("itemContainer");
const popup = document.getElementById("popup");

// inputs
const pName = document.getElementById("pName");
const pLocation = document.getElementById("pLocation");
const pContact = document.getElementById("pContact");

document.getElementById("saveBtn").onclick = saveItem;
document.getElementById("closeBtn").onclick = () => popup.classList.add("hidden");

// Load existing items
renderItems();

// ADD NEW
addBtn.onclick = () => {
    currentIndex = null; // new item
    pName.value = "";
    pLocation.value = "";
    pContact.value = "";
    popup.classList.remove("hidden");
};

// SAVE ITEM
function saveItem() {
    const obj = {
        name: pName.value,
        location: pLocation.value,
        contact: pContact.value
    };

    if (currentIndex === null) {
        items.push(obj); // new
    } else {
        items[currentIndex] = obj; // edit
    }

    localStorage.setItem("items", JSON.stringify(items));

    popup.classList.add("hidden");
    renderItems();
}

// SHOW CARDS
function renderItems() {
    container.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>Lost: <span style="color:#ffcc00;">${item.name}</span></h3>
            <p>Location: <span style="color:#00ccff;">${item.location}</span></p>
            <p>Contact: ${item.contact}</p>
        `;

        card.onclick = () => openPopup(index);
        container.appendChild(card);
    });
}

// OPEN POPUP TO EDIT
function openPopup(i) {
    currentIndex = i;
    pName.value = items[i].name;
    pLocation.value = items[i].location;
    pContact.value = items[i].contact;
    popup.classList.remove("hidden");
}
