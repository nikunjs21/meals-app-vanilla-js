// get favourites array
function getFavourites() {
  let favourites = localStorage.getItem("favourites");
  if (favourites) {
    favourites = JSON.parse(favourites);
  } else {
    favourites = [];
  }
  return favourites;
}

// set favourites array
function setFavourites(favourites) {
  if (favourites) {
    // set array by stringifying it.
    localStorage.setItem("favourites", JSON.stringify(favourites));
  } else {
    // unset item if we get emptry array.
    localStorage.removeItem("favourites");
  }
}

// adding item with key of item id so it can be easy to search
function addFavourite(item) {
  let favourites = getFavourites();
  favourites.push(item);
  setFavourites(favourites);
}

// remove item, check if item exists else remove the item
function removeFavourite(itemId) {
  let favourites = getFavourites();
  const index = favourites.findIndex((item) => item.idMeal === itemId);
  if (index !== -1){
    favourites.splice(index, 1);
  }
  setFavourites(favourites);
}

// check if item is favourite or not. return true if it is.
function isItemFavourite(favourites, item){
    const index = favourites.findIndex((favItem) => favItem.idMeal === item?.idMeal);
    return index !== -1;
}

// redirect to meal details page if user clicks on the item
function redirectToDetailsPage(itemId){
  window.location.href = `./meal-details.html?id=${itemId}`;
}

// render list of items
function renderList(meals = [], includeDeleteBtn = false) {
  // favourite items to check if it is favourite or not. if it is favourite then we will active the favourite btn
  let favourites = getFavourites();
  // items container where items will be set
  let itemsContainer = document.getElementById("itemsContainer");
  // reset container before setting new content
  itemsContainer.innerHTML = "";

  // run loop for meals to set the content
  meals.forEach((item) => {
    let buttonClass = "";
    if (includeDeleteBtn) {
      buttonClass = "active delete";
    } else if (isItemFavourite(favourites, item)) {
        buttonClass = "active";
    }
    const content = `<div class="card meal-card text-bg-dark m-2" onclick="redirectToDetailsPage(${item?.idMeal})">
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
                    </div>`;

    let parnetDiv = document.createElement("div");
    // some classes for responsiveness
    parnetDiv.classList.add("col-md-4");
    parnetDiv.classList.add("col-sm-6");
    parnetDiv.innerHTML = content;

    // append card in items container
    itemsContainer.appendChild(parnetDiv);
  });

  var favouriteBtn = document.querySelectorAll(".favourite-btn");

  // because all the time when item
  favouriteBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const mealId = button.getAttribute("data-id");
      console.log("mealId", mealId);
      if (button.classList.contains("delete")) {
        //delete from favourite list
        removeFavourite(mealId);
        renderFavourites();
      } else {
        if(button.classList.contains("active")){
            button.classList.remove("active");
            removeFavourite(mealId);
        }else{
            button.classList.add("active");
            // adding an object inside favourite to easily fatch data in favourites page. 
            addFavourite(meals.find((meal) => meal.idMeal === mealId));
        }
      }
    });
  });
}

// render favourites list
function renderFavourites() {
  let favourites = getFavourites();
  renderList(favourites, true);
}

// reset list
function resetList() {
  renderList([]);
}

// call the api service. before fetching the data we will show a loader.
async function setupMeals(searchString){
  try {
    let itemsContainer = document.getElementById("itemsContainer");
    const loader = `<div class="d-flex justify-content-center align-items-center w-100 magictime slideDownReturn">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>`;
    itemsContainer.innerHTML = loader;
    const meals = await searchMeals(searchString);
    // if meals is not empty then we will render the list. otherwise we will reset the list.
    if (meals) {
      renderList(meals.meals);
    } else {
      resetList();
    }
  } catch (error) {
    console.log(error);
  }
}