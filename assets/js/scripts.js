var favouriteBtn = document.querySelectorAll(".favourite-btn");

// get favourites array
function getFavourites(){
    let favourites = localStorage.getItem("favourites");
    if(favourites){
        favourites = JSON.parse(favourites);
    }else{
        favourites = [];
    }
    return favourites;
}

// set favourites array
function setFavourites(favourites){
    if(favourites){
        // set array by stringifying it.
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }else{
        // unset item if we get emptry array.
        localStorage.removeItem("favourites");
    }
}

// adding item with key of item id so it can be easy to search
function addFavourite(item){
    let favourites = getFavourites();
    favourites[item.idMeal] = item;
    setFavourites(favourites);
}

// remove item, check if item exists else remove the item
function removeFavourite(itemId){
    let favourites = getFavourites();
    if(favourites[itemId]){
        favourites.splice(itemId, 1);
    }
    setFavourites(favourites);
}

function renderList(meals = [], includeDeleteBtn = false){
    let favourites = getFavourites();
    meals.forEach(item => {
        let buttonClass = "";
        if(includeDeleteBtn){
            buttonClass = "active delete";
        }else if(favourites[item?.idMeal]){
            buttonClass = "active";
        }
        const content = `<div class="col-md-3">
        <div class="card">
          <img
            src="${item?.strMealThumb}"
            class="card-img-top"
            alt="${item?.strMeal}"
          />
          <div class="card-body">
            <h5 class="card-title">${item?.strMeal}</h5>
            <p class="card-text">Category: ${item?.strCategory}</p>
            <p class="card-text">Origin: ${item?.strArea}</p>                
            <a href="javascript:void(0)" data-id="${item?.idMeal}" class="favourite-btn text-danger ${buttonClass}"></a>
          </div>
        </div>
      </div>`;

      let itemsContainer = document.getElementById("itemsContainer");
      itemsContainer.appendChild(content);
    });
}

function renderFavourites(){
    let favourites = getFavourites();
    renderList(favourites, true);
}

favouriteBtn.forEach(button => {
    button.addEventListener("click", () => {
        const mealId = button.getAttribute("data-id");
        console.log("mealId", mealId);
        if (button.classList.contains('delete')) {
            //delete from favourite list
            removeFavourite(mealId);
        } else {
            // toggle active
            button.classList.toggle("active");
        }
    });
});