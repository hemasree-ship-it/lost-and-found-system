let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem() {
    let name = document.getElementById("itemName").value;
    let place = document.getElementById("place").value;
    let contact = document.getElementById("contact").value;

    if (!name || !place || !contact) {
        alert("Please fill all fields");
        return;
    }

    let item = {
        name: name,
        place: place,
        contact: contact
    };

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    displayItems();
}

function displayItems() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item, i) => {
        list.innerHTML += `
            <div class="item">
                <h3>${item.name}</h3>
                <p>Place: ${item.place}</p>
                <p>Contact: ${item.contact}</p>
            </div>
        `;
    });
}

displayItems();
