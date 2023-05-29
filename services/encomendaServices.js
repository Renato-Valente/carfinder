const database = require('../utils/firebase');

const getEncomendas = (req, res) =>{
    const EncomendasRef  = database.ref('Encomendas');

    EncomendasRef.once('value', (snap) => {
        const encomendas = snap.val();
        const result = Object.entries(encomendas);

        let final = [];
        for(let i = 0; i < result.length; i++){
            var obj = result[i][1];
            Object.assign(obj, {id: result[i][0]});
            final.push(obj);
        }

        res.json({encomendas: final}).status(200);
        
    })
}

const getEncomenda = (req, res) => {
    const EncomendasRef = database.ref('Encomendas/' + req.params.id);

    EncomendasRef.once('value', (snap) => {
        res.json(snap.val()).status(200);
    })
};

const updateEncomenda = (req, res) => {
    const EncomendasRef = database.ref('Encomendas/' + req.params.id);
    const body = req.body;

    EncomendasRef.set(body, function(error){
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

const setEncomenda = (req, res) =>{
    const EncomendasRef  = database.ref('Encomendas');
    const body = req.body;
    EncomendasRef.push().set(body, function(error) {
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

const deleteEncomenda = (req, res) => {
    const EncomendasRef  = database.ref('Encomendas/' + req.params.id);
    EncomendasRef.remove();
    
    res.json({
        id:req.params.id,
        message: 'Encomenda deletada'
    }).status(200);    
}



module.exports = {
    getEncomendas,
    getEncomenda,
    setEncomenda,
    deleteEncomenda,
    updateEncomenda
}