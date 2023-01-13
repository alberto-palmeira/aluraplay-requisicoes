// ---------- Lógica ----------
import { conectaApi } from "./conecta-api.js";

const formulario = document.querySelector('[data-formulario]');
const inputUrl = document.querySelector('[data-url]');
const inputTitulo = document.querySelector('[data-titulo]');
const inputImagem = document.querySelector('[data-imagem]');

formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    
    if(formulario.dataset.erro === 'nao') {
        const novoVideo = montaFichaVideo();

        let verificacao = verificaUrl(novoVideo);

        verificacao ? criaVideo(novoVideo) : mostraAviso();
    };

    if (formulario.dataset.erro === 'sim') {
        tentaNovamente(evento);
    };
});

// ---------- Funções ----------

async function criaVideo(novoVideo) {
        
    novoVideo.url = compatibilizaUrl(novoVideo.url);

    try {
        await conectaApi.criaVideo(novoVideo.titulo, novoVideo.descricao, novoVideo.url, novoVideo.imagem);

        window.location.href = '../pages/envio-concluido.html';
    } catch (erro) {
        localStorage.setItem('dadosVideo', JSON.stringify(novoVideo));
        formulario.dataset.erro = 'sim';
        formulario.innerHTML = `
        <h2 class="mensagem__titulo">Não foi possível enviar o vídeo.</h2><br>
        <p class="mensagem__texto">Tipo do erro: ${erro.status}.</p>
        <p class="mensagem__texto">Mensagem: ${erro.mensagem}.</p>
        <button class="formulario__botao">Tentar novamente</button>
        `
    };
};

function montaFichaVideo() {
    return {
        url: inputUrl.value,
        titulo: inputTitulo.value,
        imagem: inputImagem.value
    }
};

function verificaUrl(novoVideo) {

    if (novoVideo.url.includes('https://youtu.be') || novoVideo.url.includes('https://www.youtube.com')) {
        return true;
    };

    return false;
}

function compatibilizaUrl(urlTeste) {
    if (urlTeste.includes('youtu.be')) {
        return urlTeste.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
    };
    if (urlTeste.includes('watch?v=')) {
        return urlTeste.replace('watch?v=', 'embed/');
    };

    return urlTeste;
};

function mostraAviso() {
    const avisoErro = document.createElement('p');
    avisoErro.innerHTML = 'O link precisa ser do youtube.';
    avisoErro.classList.add('mensagem__texto');
    inputUrl.parentNode.appendChild(avisoErro);
};

function tentaNovamente (evento) {
    const listaLocalStorage = JSON.parse(localStorage.getItem('dadosVideo'));

    formulario.dataset.erro='nao';
    formulario.innerHTML = `
    <h2 class="formulario__titulo">Envie um vídeo!</h3>
    <div class="formulario__campo">
        <label class="campo__etiqueta" for="url">Link embed</label>
        <input name="url" class="campo__escrita" required
            placeholder="Por exemplo: https://www.youtube.com/embed/FAY1K2aUg5g" id='url' data-url  value="${listaLocalStorage.url}"/>
    </div>


    <div class="formulario__campo">
        <label class="campo__etiqueta" for="titulo">Titulo do vídeo</label>
        <input name="titulo" class="campo__escrita" required placeholder="Neste campo, dê o nome do vídeo" id='titulo' data-titulo ' value="${listaLocalStorage.titulo}"/>
    </div>

    <div class="formulario__campo">
        <label class="campo__etiqueta" for="imagem">Imagem de perfil</label>
        <input name="imagem" class="campo__escrita" required placeholder="Insira a url da imagem" id='imagem' data-imagem  value="${listaLocalStorage.imagem}"/>
    </div>

    <input class="formulario__botao" type="submit" />
    `

    localStorage.clear();
};