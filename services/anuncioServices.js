const database = require('./../utils/firebase');

const getAnuncios = (req, res) => {
    const anuncioRef = database.ref('Anuncios');

    if(req.query.pagina && req.query.itens){
        console.log('Recebemos os parametros');
        const query = req.query;
        const pagina = Number(query.pagina);
        const itens = Number(query.itens);

        const result = Object.entries(snap.val());

        let final = [];
        for(let i = 0; i < result.length; i++){
            var obj = result[i][1];
            Object.assign(obj, {id: result[i][0]});
            final.push(obj);
        }

        res.json({anuncios: final}).status(200);
    }

    else{
        console.log('nao recebi nada');

        anuncioRef.once('value', (snap) => {
            const result = Object.entries(snap.val());
            let final = [];
            for(let i = 0; i < result.length; i++){
                var obj = result[i][1];
                Object.assign(obj, {id: result[i][0]});
                final.push(obj);
        }

        res.json({anuncios: final}).status(200);
        })
    }
}

const getAnuncio = (req, res) => {
    const anuncioRef = database.ref('Anuncios/'+ req.params.id);

    anuncioRef.once('value', (snap) => {
        res.json(snap.val()).status(200);
    })
}

const setAnuncio = (req, res) => {
    const anuncioRef = database.ref('Anuncios');

    const body = req.body;
    anuncioRef.push().set(body, function(error) {
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error);
            res.json({
                message:'não funcionou'
            }).status(400);
          } else {
            // The write was successful...
            console.log("success");
            res.status(200).json(body);
          }
      })
}

const updateAnuncio = (req, res) => {
    const anuncioRef = database.ref('Anuncios/' + req.params.id);

    const body = req.body;

    anuncioRef.set(body, function(error){
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error);
            res.json({
                message:'não funcionou'
            }).status(400);
          } else {
            // The write was successful...
            console.log("success");
            res.json(body).status(200);
          }
    })
}

const deleteAnuncio = (req, res) => {
    const anuncioRef = database.ref('Anuncios/' + req.params.id);

    anuncioRef.remove();
    
    res.json({
        id:req.params.id,
        message: 'Anúncio deletado'
    }).status(200); 
};

module.exports = {
    getAnuncios,
    getAnuncio,
    setAnuncio,
    updateAnuncio,
    deleteAnuncio
}