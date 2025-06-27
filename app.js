// Create the async function to fetch the data
async function fetchData(event){

    // Add this to prevent page-reloading when form is submitted
    event.preventDefault();
    try{
        // fetch request
        const pokemonName = document.getElementById("typePokemonName").value;
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

        // Add the stats
        const stats = document.getElementById("pokemonStats");
        stats.innerHTML = `
        <ul>
            <li> <strong> Name: </strong> ${data.name} </li>
            <li> <strong> Id: </strong> ${data.id} </li>
            <li> <strong> Height: </strong> ${data.height} </li>
            <li> <strong> Weight: </strong> ${data.weight} </li>
        </ul>
        `
    }
    catch(error){
        alert(`An error is encountered! Please try again, maybe that is not a pokemon`)
    }
}

// Add an event listener to run the function when the button is clicked.
const button = document.getElementById("my-button");
button.addEventListener('click', fetchData);

