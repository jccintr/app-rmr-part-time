// --host=192.168.0.107
//const BASE_API = 'localhost:8000/api';
//const BASE_API = 'http://192.168.0.107:8000/api';
const BASE_API = 'https://x8ki-letl-twmt.n7.xano.io/api:32bM-PSO'   //    /auth/login


export default {
   
    base_storage: 'http://192.168.0.107:8000/storage',
    
    getUser: async (token)=> {
        const response = await fetch(`${BASE_API}/auth/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            
        });
        const json = await response.json();        
        return json;

    },

   

    signIn: async (email, password) => {
        const response = await fetch(`${BASE_API}/auth/login`, {
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
        const response = await fetch(`${BASE_API}/auth/signup`, {
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
        const req = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:v3PxHsGU/servicos', {
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