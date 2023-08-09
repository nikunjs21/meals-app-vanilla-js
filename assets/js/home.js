let searchInput = document.getElementById("input-search-meal");
if(searchInput){
  searchInput.addEventListener("keyup", (e) => {
      setupMeals(e.target.value);
  });
}

let searchButton = document.getElementById("search-button");

if(searchButton){
  searchButton.addEventListener("click",() => {
    let searchString = document.getElementById("input-search-meal").value;
    setupMeals(searchString);
  });
}

// Initially set all values
(function(){
    setupMeals("");
})();