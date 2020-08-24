const express = require('express') /* comando "require" usado para importar uma dependência */
const nunjucks = require('nunjucks') /* chamando o nunjucks(engine template) para o servidor */

const server = express() /* chamando o express para o servidor */

const videos = require("./data") /* quando precisar exportar um arquivo que está na raiz do projeto */
const { reduce } = require('./data')

server.use(express.static('public'))  /* pedindo para que o servidor utilize os arquivos estáticos da pasta public */

server.set("view engine", "njk")

nunjucks.configure("views", {  /* configurando o nunjucks na pasta views */
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) { /* comando "get" usado para pegar algum objeto */ /* "function(req, res) tulizado para o servidor "ouvir algo" e "responder algo" */
    const about = { /* variável para as informações da home */
        avatar_url: "https://dm2305files.storage.live.com/y4pKGB8VNr3cTtuSvFGGZ6qIG_p4pdKBImGbMvIWEjCGyRIrbDtPziDyDW64ZaKwfHVSq4QfnlubXWBjhcaSdWKvHEYfVPk2rlQZjWJIgmoBz9DnRWDYM_BmpX0Se_WI8XsN6YFRvaWeWeAD8vpvRDRUtzWYnqVZbH-w9R3kdjeVdEy9QnBfrlBNlvDsj_gCVyYAxUZkAtmDc4SmoOQXpem2WEAPsxOu01RwKDb9_6mloY/20200126_225240.jpg?psid=1&width=503&height=894",
        name: "Matheus da Cruz",
        description: "Apenas um amante de tecnologia, astronomia e economia",
        links: [
            {name: "GitHub", id: "github", url: "https://github.com/mathwcruz/"},
            {name: "Linkedin", id: "linkedin", url: "https://www.linkedin.com/in/matheuscruzsoftwareengineer/"}
        ]
    }
    return res.render("about",{about:about}) /* retornando o arquivo para o servidor  e criando prpriedae "about" para as informações do da home */
})

server.get("/videos", function(req, res) {
    return res.render("videos", { items: videos}) /* criando propriedade "items" para o dados "videos (array)" para enviar os dados do back pro front */
})

server.get("/video", function(req, res){ /* criando servidor que levará o usuário à url do vídeo */
    const id = req.query.id 
    const video = videos.find(function(video){ /* essa variável irá buscar o array do video e irá executar a ação abaixo */
        if (video.id == id) { /* se o id do video for igual ao id da página, executará a ação abaixo */
            return true
        }
    })

    if (!video) { /* caso o id do vídeo não for igual ao da página, executará a ação abaixo */
        return res.send("O vídeo não foi encontrado") /* retornará uma mensagem que o video não foi encontrado */
    }

    return res.render("video", { item: video }) /* irá renderizar a página de vídeos caso encontre o id compatível */
})

server.listen(5000, function(){ /* o servidor está pegando a porta 5000 e executando uma função */
    console.log("O servidor está rodando")
})