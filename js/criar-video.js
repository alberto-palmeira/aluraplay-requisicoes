// ---------- Lógica ----------
import { conectaApi } from "./conecta-api.js";

const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', evento => criaVideo(evento));

// ---------- Funções ----------

async function criaVideo(evento) {
    evento.preventDefault();

    const titulo = document.querySelector('[data-titulo]').value;
    const descricao = Math.floor(Math.random() * 10).toString();
    const url = document.querySelector('[data-url]').value;
    const imagem = document.querySelector('[data-imagem]').value;

    try {
        await conectaApi.criaVideo(titulo, descricao, url, imagem);

        window.location.href = '../pages/envio-concluido.html';
    } catch (e) {
        alert(e);
    };
};
