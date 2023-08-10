const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const mealId = parameters.get("id");

async function setUpMealById(mealId){
    try{
        let loader = document.querySelector(".loader");
        loader.classList.remove("d-none");
        const res = await getMealById(mealId);
        console.log(res);
        if(res.meals){
            var meal = res.meals[0];
            document.title = `Meals App - ${meal?.strMeal}`;
            let img = document.getElementById("food_image");
            img.src = meal?.strMealThumb;
            // set img alt attribute
            img.alt = meal?.strMeal;
            img.classList.add("magictime");
            img.classList.add("slideLeftReturn");

            let title = document.getElementById("meal-title");
            title.innerHTML = meal?.strMeal;
            title.classList.add("magictime");
            title.classList.add("slideRightReturn");

            let primaryInfoContainer = document.getElementById("primary-info-container");
            primaryInfoContainer.classList.add("magictime");
            primaryInfoContainer.classList.add("slideDownReturn");

            document.getElementById("meal-category").innerHTML = "Category: " + meal?.strCategory;
            document.getElementById("meal-area").innerHTML = "Origin: " + meal?.strArea;
            document.getElementById("meal-description").innerHTML = meal?.strInstructions;

            let secondaryInfoContainer = document.getElementById("secondary-info-container");
            secondaryInfoContainer.classList.add("magictime");
            secondaryInfoContainer.classList.add("slideDownReturn");

            let ingredientsCounter = 1;

            ingredientsContainer = document.querySelector(".ingredient-rows");

            while(typeof meal[`strIngredient${ingredientsCounter}`] === "string" && meal[`strMeasure${ingredientsCounter}`].trim() !== ""){
                const ingredient = meal[`strIngredient${ingredientsCounter}`];
                const measure = meal[`strMeasure${ingredientsCounter}`];
                const newData = `<td>${ingredient}</td><td>${measure}</td>`;
                let tr = document.createElement("tr");
                tr.innerHTML = newData;
                ingredientsContainer.appendChild(tr);
                ingredientsCounter++;
            }

            document.querySelector(".details-container").classList.remove("d-none");
        }else{
            alert("No Details Found!");
            window.location.href = "index.html";
        }
        loader.classList.add("d-none");
    }catch(error){
        console.log(error);
        loader.classList.add("d-none");
    }
}

if(mealId){
    setUpMealById(mealId);
}

