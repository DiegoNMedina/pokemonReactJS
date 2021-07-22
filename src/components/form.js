import React from 'react'

class Form extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
            name: 'Buscando...',
            img : 'https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-2.png',
            hp : '100',
            experience : '100',
            attack : '100',
            defense : '100',
            specialAttack : '100',
        }
    }

    getRandomPokemon = () => {
        return Math.floor(Math.random() * (151-1)) + 1;

    }
    
    getPokemon = async() => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
        const data = await res.json();
        // console.log(data.sprites.front_default);
        this.setState({
            name: data.name,
            img : data.sprites.other.dream_world.front_default,
            hp : data.stats[0].base_stat,
            experience : data.base_experience,
            attack : data.stats[1].base_stat,
            defense : data.stats[2].base_stat,
            specialAttack : data.stats[3].base_stat,
            
        });
        } catch (error) {
            console.log(error);
        }
    }
    handleName = event => {
        this.setState({
            name : event.target.value
        })
    }
    handleSubmit = event => {
        this.getPokemon();
        event.preventDefault();
    }
    render() {
    return (
         <div className="flex">
             <article className="card">
                <img src="./images/bg-pattern-card.svg" alt="imagen header card" className="card-header" />
                <div className="card-body">
                    <img src={this.state.img} alt="imagen de vitoko" className="card-body-img" />
                    <h1 className="card-body-title">
                        {this.state.name}
                        <span> {this.state.hp} HP</span>
                    </h1>
                    <p className="card-body-text">{this.state.experience }</p>
                </div>
                <div className="card-footer">
                    <div className="card-footer-social">
                        <h3>{this.state.attack} K</h3>
                        <p>Ataque</p>
                    </div>
                    <div className="card-footer-social">
                        <h3>{this.state.specialAttack} K</h3>
                        <p>Especial</p>
                    </div>
                    <div className="card-footer-social">
                        <h3>{this.state.defense}K</h3>
                        <p>Defensa</p>
                    </div>
                </div>
            </article>
            <div>
                <form className="pokemon-form" onSubmit={this.handleSubmit}>
                    <input type="text" className="search" placeholder="Nombre" onChange={this.handleName}  />
                    <button>Buscar</button>
                </form>
            </div>
         </div>
    );
    }
}

export default Form;