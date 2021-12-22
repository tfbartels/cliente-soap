var soap = require('soap');
const fs = require('fs');

const url = '';
const user = '';
const password = '';
const auth = "Basic " + new Buffer.from(user + ":" + password).toString("base64");
const headers = {   
                    autenticar:{
                        cnpj: '',
                        chave: ''
                    }
                };

const args = [  

];               

function processoComAsync(){
    args.forEach( arg => {
        (async () => {
            const client = await soap.createClientAsync(url, { wsdl_headers: {Authorization: auth} });
            
            client.addSoapHeader(headers);      
            const response = await client.consultarAutoInfracaoBaseEstadualAsync(arg);
            
            let data = response[0].Dados;
      
            console.log(data);
            fs.appendFileSync('response.csv', data+"\n");                             
        })();
    }); 
}

function processoSemAsync(){
    args.forEach(arg =>
        soap.createClient(url, { wsdl_headers: {Authorization: auth} },  function(err, client) {
            if(err) return console.log(err);

            client.addSoapHeader(headers);        
                client.consultarAutoInfracaoBaseEstadual(arg, function(err, result) {
                    if(err) return console.log(err);        
                                
                    let data = result.Dados;
                                
                    console.log(data);
                    fs.appendFileSync('response.csv', data+"\n");     
                })      
        })
    ); 
}  

processoComAsync();