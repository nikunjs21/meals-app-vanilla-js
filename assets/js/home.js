// Get the search input element
let searchInput = document.getElementById("input-search-meal");

// Check if the search input element exists
if (searchInput) {
    // Add a keyup event listener to the search input
    searchInput.addEventListener("keyup", (e) => {
        // Call the setupMeals function with the current search input value
        setupMeals(e.target.value);
    });
}

// Get the search button element
let searchButton = document.getElementById("search-button");

// Check if the search button element exists
if (searchButton) {
    // Add a click event listener to the search button
    searchButton.addEventListener("click", () => {
        // Get the value of the search input
        let searchString = document.getElementById("input-search-meal").value;
        // Call the setupMeals function with the search input value
        setupMeals(searchString);
    });
}

// IIFE function to initially set up all values
(function() {
    // Call the setupMeals function with an empty string to initialize the page
    setupMeals("");
})();
