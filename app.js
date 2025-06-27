// Create the async function to fetch the data
async function fetchData(event){

    // Add this to prevent page-reloading when form is submitted
    event.preventDefault();
    try{
        // take the value of the form
        const pokemonName = document.getElementById("typePokemonName").value;

        // fetch request
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        // check if pokemonName is invalid
        if (!result.ok){
            throw new Error(`Pokemon not found`)
        }

        // take the result and transform it into json format
        const data = await result.json();
        console.log(data);

        // Add the sprite to `div id="pokemonSprite"`
        const sprite = data.sprites.front_default;
        const spriteImage = document.getElementById("pokemonSpriteImg");
        spriteImage.src = sprite
    }
    catch(error){
        alert(`An error is encountered! Please try again, maybe that is not a pokemon`)
    }
}

// Add an event listener to run the function when the button is clicked.
const button = document.getElementById("my-button");
button.addEventListener('click', fetchData);

