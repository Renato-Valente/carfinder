const database = require('./../utils/firebase');

const getVender_carros = (req, res) =>{
    const vender_carroRef = database.ref('vender_carro');

    vender_carroRef.once('value', (snap) => {
        
        const vender_carros = snap.val();
        const result = Object.entries(vender_carros);

        let final = [];
        for(let i = 0; i < result.length; i++){
            var obj = result[i][1];
            Object.assign(obj, {id: result[i][0]});
            final.push(obj);
        }

        res.json({vender_carros: final}).status(200);
    })
}

const getVender_carro = (req, res) => {
    const vender_carroRef = database.ref('vender_carro/' + req.params.id);
    vender_carroRef.once('value', (snap) => {
        res.json(snap.val()).status(200);
    })

}

const setVender_carro = (req, res) => {
    const vender_carroRef = database.ref('vender_carro');
    const body = req.body;
    vender_carroRef.push().set(body, function(error) {
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

const updateVender_carro = (req, res) => {
    const vender_carroRef = database.ref('vender_carro/' + req.params.id);
    const body = req.body;

    vender_carroRef.set(body, function(error){
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

const deleteVender_carro = (req, res) => {
    const vender_carroRef = database.ref('vender_carro/' + req.params.id);
    vender_carroRef.remove();
    
    res.json({
        id:req.params.id,
        message: 'Encomenda deletada'
    }).status(200);
}

module.exports = {
    getVender_carros,
    getVender_carro,
    setVender_carro,
    updateVender_carro,
    deleteVender_carro
};