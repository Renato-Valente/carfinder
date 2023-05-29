/* console.log('bom dia');

const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBIn9TlM3gOAVr-75IYkgUhf_eHap0nqyg",
    authDomain: "projeto-teste-446ba.firebaseapp.com",
    projectId: "projeto-teste-446ba",
    storageBucket: "projeto-teste-446ba.appspot.com",
    messagingSenderId: "754603784260",
    appId: "1:754603784260:web:fafa895f44922b8392e411",
    measurementId: "G-FDD5K4B1GJ"
  };

  firebase.initializeApp(firebaseConfig)

  const database = firebase.database();

const pessoasRef = database.ref('Pessoas');

  pessoasRef.on('value', (snap) => {
    console.log(snap.val());
})

console.log('fim do programa'); */

const express = require('express');
const app = express();

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.send('server funcionando');
});

const pessoasRoutes = require('./routes/user');
const encomendasRoutes = require('./routes/encomenda');
const vender_carroRoutes = require('./routes/vender_carro');
const leadsRoutes = require('./routes/lead');
const anunciosRoutes = require('./routes/anuncio');

app.use('/pessoas', pessoasRoutes);
app.use('/encomendas', encomendasRoutes);
app.use('/vender_carro', vender_carroRoutes);
app.use('/leads', leadsRoutes);
app.use('/anuncios', anunciosRoutes);


/* app.get('/teste', (req, res) => {
  if(req.query.teste){
    res.json({
      teste:req.query.teste
    })
  }
  else{
    res.json({
      teste:'nao foi'
    })
  }
  
}) */

const PORT = 5000;

app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);
});