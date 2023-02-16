// --host=192.168.0.107
//const BASE_API = 'localhost:8000/api';
const BASE_API = 'https://rmr-api.js-software.tech/api';
///const BASE_API = 'https://x8ki-letl-twmt.n7.xano.io/api:32bM-PSO'   //    /auth/login


export default {
   
    base_storage: 'https://rmr-api.js-software.tech/storage',
    
    getUser: async (token)=> {
        const response = await fetch(`${BASE_API}/user/${token}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
       return response;
    },

   

    signIn: async (email, password) => {
        const response = await fetch(`${BASE_API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       // const json = await response.json();        
        return response;
    },

    signUp: async (name, email,telefone,password,role) => {
        const response = await fetch(`${BASE_API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,telefone,email,password,role})
        });
        const json = await response.json();        
        return json;
    },

    logout: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    getServices: async () => {
        const req = await fetch(`${BASE_API}/servicos`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
       
    },
    getContratadosByService: async (idServico) => {
        const req = await fetch(`${BASE_API}/contratados/${idServico}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },
    subscribeService: async (user_id,servico_id) => {
         const response = await fetch(`${BASE_API}/contratados`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id,servico_id, ativo: true})
        });
        return response;
    },
    /*
    unSubscribeService: async (id) => {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:v3PxHsGU/contratados', {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({user_id: idUser,servicos_id: idService})
       });
       return response;
   },*/
   activeService: async (contratado_id) => {
    const response = await fetch(`${BASE_API}/contratados/active`, {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({contratado_id})
   });
   return response;
},
deactiveService: async (contratado_id) => {
    const response = await fetch(`${BASE_API}/contratados/deactive`, {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({contratado_id})
   });
   return response;
},
updateUser: async (usuario_id,documento,endereco,bairro,cidade,token) => {
    const response = await fetch(`${BASE_API}/user/update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({usuario_id,documento,endereco,bairro,cidade})
     });
     return response.json();
},

updateAvatar: async (fd) => {
    const response = await fetch(`${BASE_API}/avatar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: fd

    });
   return response;
},
addContrato: async (servico_id,cliente_id,profissional_id,data,data_servico,descricao,local,quant,valor_unitario_cliente,valor_unitario_profissional,total_cliente,total_profissional) => {
    const response = await fetch(`${BASE_API}/contratos`, {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({servico_id,cliente_id,profissional_id,data,data_servico,descricao,local,quant,valor_unitario_cliente,valor_unitario_profissional,total_cliente,total_profissional})
   });
   return response;
},
getContratosByCliente: async (idCliente) => {
    const req = await fetch(`${BASE_API}/contratos/cliente/${idCliente}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
       
    });
    const json = await req.json();        
    return json;
},
getContratosByProfissional: async (idProfissional) => {
    const req = await fetch(`${BASE_API}/contratos/profissional/${idProfissional}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
       
    });
    const json = await req.json();        
    return json;
},
   
  
   
};