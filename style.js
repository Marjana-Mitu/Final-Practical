function connect() {
    const searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";
    const url = https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm};

    fetch (url)
        .then(res => res.json())
        .then(data => display(data));
}

function display(data) {
    const meals = data.meals;
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Clear previous results

    if (!meals) {
        displayArea.innerHTML = <p>No meals found.</p>;
        return;
    }

    meals.slice(0, 5).forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
            <h3>${meal.strMeal} (ID: ${meal.idMeal})</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions.slice(0, 150)}...</p>
        `;
        mealDiv.classList.add("meal-card");
        displayArea.appendChild(mealDiv);
    });

    if (meals.length > 5) {
        const showAllButton = document.createElement("button");
        showAllButton.textContent = "SHOW ALL";
        showAllButton.onclick = () => showAll(meals);
        displayArea.appendChild(showAllButton);
    }
}

function showAll(meals) {
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Clear current results

    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
            <h3>${meal.strMeal} (ID: ${meal.idMeal})</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
        `;
        mealDiv.classList.add("meal-card");
        displayArea.appendChild(mealDiv);
    });
}