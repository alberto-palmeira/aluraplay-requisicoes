// ---------- Lógica ----------

import { conectaApi } from "./conecta-api.js";
import constroiCard from "./mostrar-videos.js";

const botaoPesquisa = document.querySelector('[data-botao-pesquisa]');
const dadosDePesquisa = document.querySelector('[data-pesquisa]');
const lista = document.querySelector('[data-lista]');

botaoPesquisa.addEventListener('click', evento => {
    evento.preventDefault();

    buscarVideo();
});

dadosDePesquisa.addEventListener('keypress', evento => {
    console.log(evento);
    
    if(evento.key === 'Enter') {
        evento.preventDefault();

        buscarVideo();
    }
})

// ---------- Funções ----------

async function buscarVideo () {
    const busca = await conectaApi.buscaVideos(dadosDePesquisa.value);
    
    if (busca.length > 0) {
        lista.innerHTML = '';

        busca.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));
    } else {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>`
    };
};