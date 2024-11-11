"use strict";

(() => {
    // Utility Functions
    const isEmptyArray = (array) => !Array.isArray(array) || !array.length;
    const isDate = (date) => date instanceof Date && !isNaN(date.getTime());
    const formatDate = (date) => date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });

    const initDatePickers = (startElement, endElement) => {
        $(startElement).datepicker({
            format: "dd-mm-yyyy",
            language: "en-GB",
            autoHide: true,
            startDate: new Date(),
            pick: function(e) {
                if (e.view === "day") {
                    let selectedDate = e.date;
                    $(endElement).datepicker("setStartDate", selectedDate);
                }
            },
        });

        $(endElement).datepicker({
            format: "dd-mm-yyyy",
            language: "en-GB",
            autoHide: true,
            startDate: new Date(),
            pick: function(e) {
                if (e.view === "day") {
                    let selectedDate = e.date;
                    $(startElement).datepicker("setEndDate", selectedDate);
                }
            },
        });
    };

    // Function to load items based on category
    const loadItems = (category) => {
        const data = JSON.parse(localStorage.getItem("enquiry"));
        const items = data ? data.filter(item => item.category === category) : [];
        const container = category === "New Hire" ? "#hireItemsList" : "#salesItemsList";
        $(container).empty();

        items.forEach(item => {
            const itemHtml = createItemHtml(item);
            $(container).append(itemHtml);
        });

        // Initialize date pickers for each item
        items.forEach(item => {
            initDatePickers(`#${item.id}-start`, `#${item.id}-end`);
        });
    };

    const createItemHtml = (item) => {
        // Returns HTML for a single item
        const dateHtml = `
            <div class="date-picker">
                <input type="text" class="calendar-field" id="${item.id}-start" placeholder="Start Date">
                <input type="text" class="calendar-field" id="${item.id}-end" placeholder="End Date">
            </div>
        `;

        return `
            <div id="${item.id}" class="item">
                <div class="item-details">${item.name}</div>
                ${dateHtml}
                <div class="item-qty">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <input type="number" value="${item.qty}" class="item-qty-input" data-id="${item.id}">
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            </div>
        `;
    };

    const updateLocalStorage = (items) => {
        localStorage.setItem("enquiry", JSON.stringify(items));
    };

    // Event Listeners for item actions
    $(document).on("click", ".qty-btn", function() {
        const id = $(this).data("id");
        const action = $(this).data("action");
        const items = JSON.parse(localStorage.getItem("enquiry"));
        const item = items.find(i => i.id === id);

        if (action === "increase") item.qty++;
        else if (action === "decrease" && item.qty > 1) item.qty--;

        updateLocalStorage(items);
        loadItems(item.category);
    });

    $(document).on("click", ".remove-item-btn", function() {
        const id = $(this).data("id");
        const items = JSON.parse(localStorage.getItem("enquiry")).filter(i => i.id !== id);
        
        updateLocalStorage(items);
        loadItems(items[0].category);  // Assuming remaining items belong to the same category
    });

    // Initial load
    loadItems("New Hire");
    loadItems("Sales Quote");

})();
