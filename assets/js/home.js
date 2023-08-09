let searchInput = document.getElementById("input-search-meal");
if(searchInput){
  searchInput.addEventListener("keyup", (e) => {
      setupMeals(e.target.value);
  });
}

// Initially set all values
(function(){
    setupMeals("");
})();