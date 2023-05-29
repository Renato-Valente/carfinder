const database = require('./../utils/firebase');

const getLeads = (req, res) => {
    const leadRef = database.ref('Leads');

    leadRef.once('value', (snap) => {
    const leads = snap.val()
    const result = Object.entries(leads);

        let final = [];
        for(let i = 0; i < result.length; i++){
            var obj = result[i][1];
            Object.assign(obj, {id: result[i][0]});
            final.push(obj);
        }

        res.json({leads: final}).status(200);


        /* res.json({leads: Object.keys(leads).reduce((items, leadId) =>
            [...items,
            {id: leadId,
            ...leads[leadId]}], [])}).status(200); */
    })
};

const getLead = (req, res) => {
    const leadRef = database.ref('Leads/' + req.params.id);

    leadRef.once('value', (snap) => {
        res.json(snap.val()).status(200);
    })
};

const setLead = (req, res) => {
    const leadRef = database.ref('Leads');
    const body = req.body;
    leadRef.push().set(body, function(error) {
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

const updateLead = (req, res) => {
    const leadRef = database.ref('Leads/' + req.params.id);

    const body = req.body;

    leadRef.set(body, function(error){
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
};

const deleteLead = (req, res) => {
    const leadRef = database.ref('Leads/' + req.params.id);

    leadRef.remove();
    
    res.json({
        id:req.params.id,
        message: 'Lead deletada'
    }).status(200); 
}

module.exports = {
    getLeads,
    getLead,
    setLead,
    updateLead,
    deleteLead
};

