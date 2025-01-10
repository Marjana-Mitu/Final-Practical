function connect() {
    var searchTerm = document.getElementById("searchBox").value.trim();
    document.getElementById("searchBox").value = "";
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => display(data))
        .catch(err => console.error("Error fetching data:", err));
}

function display(data) {
    var allMeals = data.meals; 
    var displayArea = document.getElementById("displayArea");
    displayArea.textContent = ""; 

    if (!allMeals) {
        displayArea.textContent = "No meals found!";
        return;
    }

    for (var i = 0; i < Math.min(allMeals.length, 5); i++) {
        var mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
            <h3>Meal Title: ${allMeals[i].strMeal}</h3>
            <img src="${allMeals[i].strMealThumb}" alt="${allMeals[i].strMeal}">
            <p>Cooking Instructions: ${allMeals[i].strInstructions}</p>
        `;
        mealDiv.classList.add("meal-card");
        displayArea.appendChild(mealDiv);
    }

    if (allMeals.length > 5) {
        var showAllButton = document.createElement("button");
        showAllButton.textContent = "SHOW ALL";
        showAllButton.onclick = () => showAll(allMeals); // Pass `allMeals` to `showAll`
        displayArea.appendChild(showAllButton);
    }
}

function showAll(meals) {
    var displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = "";

    meals.forEach(meal => {
        var mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
            <h3>${meal.strMeal} (ID: ${meal.idMeal})</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
        `;
        mealDiv.classList.add("meal-card");
        displayArea.appendChild(mealDiv);
    });
}
