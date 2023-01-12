// ---------- Lógica ----------
import { conectaApi } from "./conecta-api.js";

const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', evento => criaVideo(evento));

// ---------- Funções ----------

async function criaVideo(evento) {
    evento.preventDefault();

    const titulo = document.querySelector('[data-titulo]').value;
    const descricao = Math.floor(Math.random() * 10).toString();
    let url = document.querySelector('[data-url]').value.toString();
    const imagem = document.querySelector('[data-imagem]').value;
    
    url = verificaUrl(url);

    try {
        await conectaApi.criaVideo(titulo, descricao, url, imagem);

        window.location.href = '../pages/envio-concluido.html';
    } catch (e) {
        alert(e);
    };

};

function verificaUrl(urlTeste) {
    if (urlTeste.includes('youtu.be')) {
        return urlTeste.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
    };
    if (urlTeste.includes('watch?v=')) {
        return urlTeste.replace('watch?v=', 'embed/');
    };

    return urlTeste;
}
