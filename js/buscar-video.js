// ---------- Lógica ----------

import { conectaApi } from "./conecta-api.js";
import constroiCard from "./mostrar-videos.js";

const botaoPesquisa = document.querySelector('[data-botao-pesquisa]');

botaoPesquisa.addEventListener('click', evento => buscarVideo(evento));

// ---------- Funções ----------

async function buscarVideo (evento) {
    evento.preventDefault();
    
    const dadosDePesquisa = document.querySelector('[data-pesquisa]').value;
    const busca = await conectaApi.buscaVideos(dadosDePesquisa);
    
    const lista = document.querySelector('[data-lista]');

    lista.innerHTML = '';

    busca.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));

    if(busca.length === 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>`
    }
};