// --host=192.168.0.107

//const BASE_API = 'http://192.168.0.107:8000/api';
const BASE_API = 'https://rmrparttime.com/api';



export default {
   
    base_storage: 'https://rmrparttime.com/storage',
    //base_storage: 'http://192.168.0.107:8000/storage',
    
    

    getUser: async (token) => {
        const response = await fetch(`${BASE_API}/user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

    login: async (email, password) => {
        const response = await fetch(`${BASE_API}/login`, {
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

    cadastro: async (name, email,telefone,password,role,concelho_id,categoria_id) => {
        
        const response = await fetch(`${BASE_API}/cadastro`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,telefone,email,password,role,concelho_id,categoria_id})
        });
        //const json = await response.json();        
        return response;
    },
    logout: async (token) => {
        const response = await fetch(`${BASE_API}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    verifyEmail: async (token,codigo) => {
        const response = await fetch(`${BASE_API}/verifyemail`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({codigo})
        });
        return response;
    },
    getVerificationEmail: async (token) => {
        const response = await fetch(`${BASE_API}/sendverificationemail`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    requestPasswordEmail: async (email) => {
        const response = await fetch(`${BASE_API}/sendrecoverypasswordmail`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        return response;
    },
    changePassword: async (email,password,codigo) => {
        const response = await fetch(`${BASE_API}/changepassword`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password,codigo})
        });
        return response;
    },
    

    getCategorias: async () => {
        const req = await fetch(`${BASE_API}/categorias`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },
    getCategoriasWorker: async (token) => {
        const response = await fetch(`${BASE_API}/categorias2`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await response.json();
        return json;
    },

    getCategoria: async (id) => {
        const req = await fetch(`${BASE_API}/categorias/${id}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },

    getDistritos: async () => {
        const req = await fetch(`${BASE_API}/distritos`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },

    getConcelhos: async (idDistrito) => {
        const req = await fetch(`${BASE_API}/concelhos/${idDistrito}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
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

updateAvatar: async (token,fd) => {
    const response = await fetch(`${BASE_API}/avatar`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        },
        body: fd

    });
   return response;
},

addOrcamento: async (token,fd) => {
    const response = await fetch(`${BASE_API}/orcamentos`, {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + token},
        body: fd
    });
    return response;
},
getOrcamentos: async (token) => {
    const response = await fetch(`${BASE_API}/orcamentos`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    const json = await response.json();
    return json;
},
   
getAllOrcamentos: async (token) => {
    const response = await fetch(`${BASE_API}/orcamentos/all`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    const json = await response.json();
    return json;
},

getOrcamentosByCategory: async (token,id) => {
    const response = await fetch(`${BASE_API}/orcamentos/categoria/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    const json = await response.json();
    return json;
},


addProposta: async (token,orcamento_id,resposta,valor) => {
    const response = await fetch(`${BASE_API}/propostas`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({orcamento_id,resposta,valor})
    });
    return response;
},


  
   
};