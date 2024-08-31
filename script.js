const main = document.querySelector("body");
const input = document.getElementById("input");
const button = document.getElementById("btn");
const body = document.querySelector("main");
const recipe_body = document.getElementById("recipe");
const recipe_name = document.getElementById("recipe-name");
const recipe_ing = document.getElementById("ingredients");
const recipe_process = document.getElementById("process");
const close_recipe = document.getElementById("close-btn");
const welcome = document.getElementById("welcome");
async function fetchRecipe(){
    welcome.style.display = "none";
    url_api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
    if(input.value == "") return;
    body.innerHTML = "";
    const response = await fetch(url_api);
    const data = await response.json();
    if(data.meals == null){
        body.innerHTML = `<div class="error">Recipe not found...</div>`;
        body.style.overflowX = "hidden";
        return;
    }
    console.log(data);
    let i=0;
    let array = [];
    data.meals.forEach(recipe => {
        const box = document.createElement("div");
        box.classList = "items";
        box.innerHTML = `<div><img src = "${recipe.strMealThumb}"/></div>
        <h3>${recipe.strMeal}</h3>
        <h4>${recipe.strCategory}</h4>
        <div class="btn"><button id="recipe-button${i}">Recipe</button></div>`;
        array.push(`recipe-button${i}`);
        body.appendChild(box);
        i++;
    });
    array.forEach((btn)=>{
        let currBtn = document.getElementById(`${btn}`);
        currBtn.addEventListener("click",()=>{
            recipe_body.style.display = "grid";
            main.style.overflow = "hidden";
            let recipe_details = data.meals[btn[btn.length - 1]];
            recipe_name.innerHTML = recipe_details.strMeal;
            recipe_ing.innerHTML = "";
            for(let i=1;i<50;i++){
                if((recipe_details[`strIngredient${i}`]) == ""){
                    break;
                }
                else{
                    recipe_ing.innerHTML += `<li>${recipe_details[`strIngredient${i}`]} - ${recipe_details[`strMeasure${i}`]}</li>`;
                }
            }
            recipe_process.innerHTML = recipe_details.strInstructions;
            close_recipe.addEventListener("click",close);
            function close(){
                recipe_body.style.display = "none";
                main.style.overflow = "scroll";
            }
        });
    });
}
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});
button.addEventListener("click",fetchRecipe);
