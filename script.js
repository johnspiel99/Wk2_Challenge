document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const clearListButton = document.getElementById("clearListButton");
    const shoppingList = document.getElementById("shoppingList");

    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
// storage on local machine
    const saveItems = () => {
        localStorage.setItem("shoppingList", JSON.stringify(items));
    };

    const renderItems = () => {
        shoppingList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = item.purchased ? "purchased" : "";
            li.innerHTML = `
                <span contenteditable>${item.name}</span>
                <button onclick="markPurchased(${index})">Mark Purchased</button>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            shoppingList.appendChild(li);
        });
    };
// add items
    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = "";
            saveItems();
            renderItems();
        }
    };
// mark items as purchased
    const markPurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveItems();
        renderItems();
    };
// remove items
    const removeItem = (index) => {
        items.splice(index, 1);
        saveItems();
        renderItems();
    };
//clear the list
    const clearList = () => {
        items = [];
        saveItems();
        renderItems();
    };
// event listener actions
    addItemButton.addEventListener("click", addItem);
    clearListButton.addEventListener("click", clearList);
    itemInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });

    renderItems();
});
