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
        spriteImage.style = ''  // to remove the display: none
        spriteImage.src = sprite

        // Extracting pokemon type using a map (that is an array method to create a new array applying a rule, a function to each element)
        const pokemonType = data.types.map(x => x.type.name)
        const displayPokemonType = pokemonType.splice('')

        // Add the stats
        const stats = document.getElementById("pokemonStats");
        stats.innerHTML = `
        <ul id="statsList">
            <li> <strong> Name: </strong> ${data.name} </li>
            <br/>
            <li> <strong> Type: </strong> ${displayPokemonType} </li>
            <br/>
            <li> <strong> Id: </strong> ${data.id} </li>
            <br/>
            <li> <strong> Height: </strong> ${data.height} m </li>
            <br/>
            <li> <strong> Weight: </strong> ${data.weight} kg </li>
        </ul>
        `

        // Creating the function to change to shiny when sprite is clicked:
        const changeToShiny = () => {
            // Must delete the previous value first because it was showing up for some seconds before showing the new one. 
            spriteImage.src = '';
            spriteImage.src = data.sprites.front_shiny;
        }

        // Add the event listener to the sprite
        spriteImage.addEventListener(`click`, changeToShiny);
    }
    catch(error){
        alert(`An error is encountered! Please try again, maybe that is not a pokemon`)
    }
}



// Add an event listener to run the function when the button is clicked.
const button = document.getElementById("my-button");
button.addEventListener('click', fetchData);


