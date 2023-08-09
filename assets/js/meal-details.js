const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const mealId = parameters.get("id");

async function setUpMealById(mealId){
    try{
        const res = await getMealById(mealId);
        console.log(res);
        if(res.meals){
            var meal = res.meals[0];
            document.title = `Meals App - ${meal?.strMeal}`;
        }
    }catch(error){
        console.log(error);
    }
}

if(mealId){
    setUpMealById(mealId);
}

