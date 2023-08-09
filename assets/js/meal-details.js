const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const mealId = parameters.get("id");

async function setUpMealById(mealId){
    try{
        const res = await getMealById(mealId);
        console.log(res);
    }catch(error){
        console.log(error);
    }
}

if(mealId){
    setUpMealById(mealId);
}

