// Get the query string from the current URL
const queryString = window.location.search;

// Extract and handle query parameters
const parameters = new URLSearchParams(queryString);
const mealId = parameters.get("id");

// Function to set up meal details using its ID
async function setUpMealById(mealId) {
    try {
        // Get the loader element and show it
        let loader = document.querySelector(".loader");
        loader.classList.remove("d-none");
        
        // Fetch meal details by ID
        const res = await getMealById(mealId);
        
        // Check if meal details were found
        if (res.meals) {
            // Get the first meal from the response
            var meal = res.meals[0];
            
            // Update document title with meal name
            document.title = `Meals App - ${meal?.strMeal}`;

            // Set image source, alt text, and apply animations
            let img = document.getElementById("food_image");
            img.src = meal?.strMealThumb;
            img.alt = meal?.strMeal;
            img.classList.add("magictime");
            img.classList.add("slideLeftReturn");

            // Set and animate meal title
            let title = document.getElementById("meal-title");
            title.innerHTML = meal?.strMeal;
            title.classList.add("magictime");
            title.classList.add("slideRightReturn");

            // Show primary information container with animation
            let primaryInfoContainer = document.getElementById("primary-info-container");
            primaryInfoContainer.classList.add("magictime");
            primaryInfoContainer.classList.add("slideDownReturn");

            // Update meal category, area, and description
            document.getElementById("meal-category").innerHTML = "Category: " + meal?.strCategory;
            document.getElementById("meal-area").innerHTML = "Origin: " + meal?.strArea;
            document.getElementById("meal-description").innerHTML = meal?.strInstructions;

            // Show secondary information container with animation
            let secondaryInfoContainer = document.getElementById("secondary-info-container");
            secondaryInfoContainer.classList.add("magictime");
            secondaryInfoContainer.classList.add("slideDownReturn");

            // Loop ingredients and measures by counter one by one, create rows in the ingredients container
            let ingredientsCounter = 1;
            ingredientsContainer = document.querySelector(".ingredient-rows");
            while (typeof meal[`strIngredient${ingredientsCounter}`] === "string" && meal[`strMeasure${ingredientsCounter}`].trim() !== "") {
                const ingredient = meal[`strIngredient${ingredientsCounter}`];
                const measure = meal[`strMeasure${ingredientsCounter}`];
                const newData = `<td>${ingredient}</td><td>${measure}</td>`;
                let tr = document.createElement("tr");
                tr.innerHTML = newData;
                ingredientsContainer.appendChild(tr);
                ingredientsCounter++;
            }

            // Show details container
            document.querySelector(".details-container").classList.remove("d-none");
        } else {
            // Alert if no details found and redirect to index
            alert("No Details Found!");
            window.location.href = "index.html";
        }

        // Hide the loader
        loader.classList.add("d-none");
    } catch (error) {
        // Log any errors and hide the loader
        console.log(error);
        loader.classList.add("d-none");
    }
}

// If a mealId is present, set up meal details using the ID
if (mealId) {
    setUpMealById(mealId);
}
