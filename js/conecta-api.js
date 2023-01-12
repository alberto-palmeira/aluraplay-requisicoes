async function listaVideos () {
    const conexao = await fetch("http://localhost:3000/videos");
    const conexaoConvertida = await conexao.json();

    if(!conexao.ok) {
        let erro = new Error;
        erro.status = conexao.status;
        erro.mensagem = conexao.statusText;         
        throw erro;
    };

    return conexaoConvertida;
};

async function criaVideo (titulo, descricao, url, imagem) {
    if (url.includes('https://youtu.be/')) {
        url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
    };

    console.log(url);
    
    const conexao = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
        })
    });
    
    if(!conexao.ok) {
        throw new Error('Não foi possível enviar o vídeo');
    };

    const conexaoConvertida = conexao.json();
    return conexaoConvertida;
}

async function buscaVideos (termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

export const conectaApi = {
    listaVideos,
    criaVideo,
    buscaVideos
};
