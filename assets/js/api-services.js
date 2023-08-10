// The base URL for the API
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

// Function to search for meals based on a search string
const searchMeals = async searchString => {
    try {
        // Make a GET request to the API with the search string
        const response = await fetch(`${BASE_URL}search.php?s=${searchString}`);
        
        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        // Log any errors that occur during the API request
        console.log(error);
    }
}

// Function to retrieve meal details by ID
const getMealById = async id => {
    try {
        // Make a GET request to the API with the meal ID
        const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
        
        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        // Log any errors that occur during the API request
        console.log(error);
    }
}
