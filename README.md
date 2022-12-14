# Pokedex

The project consumes an API with 151 pokemons and display them with their corresponding status, and with a search filter by name. I tried to recreat the [CodeBoost PokeApi Project](https://codeboost.com.br/projetos/pokeapi/) .

## Demo

https://pokedex-arua.netlify.app/

![image](https://user-images.githubusercontent.com/103606795/207615745-0cc4bf73-a823-4fd1-87b8-a993768f352f.png)
![image](https://user-images.githubusercontent.com/103606795/207615959-85fe77ce-93e7-4663-8d7a-353d91d47c10.png)


## Lessons Learned

This project taught me basic concepts of React.js, such as how to structure a basic project, useState, useEffect, handling event changes. When I was finishing the project the API wouldn't work and I didn't know why, so I had to spend a couple of days trying to debug. When I found it, I learned that the forEach loop was not built to work with asynchronous callback functions, and that instead you should use the for loop.

## Run Locally

Clone the project

```bash
  git clone https://github.com/aruadecarvalho/pokedex.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Appendix

[PokeApi](https://pokeapi.co/) is unstable, it might take a while to load the pokemons.

## Acknowledgements

- [CodeBoost](https://codeboost.com.br/projetos/pokeapi/)
- [MonsterRolodex](https://terieyenike.github.io/rolodex/)
