'use strict';

// const API_URL = 'http://localhost:7000'
const API_URL = 'https://banco-curriculos-jobsnet.herokuapp.com/'

const $addressInput = document.getElementById('endereco');
const $neighborhoodInput = document.getElementById('bairro');
const $city = document.getElementById('cidade');
const $uf = document.getElementById('uf');

const fillAddress = (address) => {
    $addressInput.value = address.logradouro || '';
    $neighborhoodInput.value = address.bairro || ''; 
    $city.value = address.localidade || ''; 
    $uf.value = address.uf || ''; 
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            $endereco.value = 'CEP não localizado';
    
        } else {
            fillAddress(endereco);
        }
    } else {
        fillAddress({});
        $endereco.value = 'CEP incorreto';
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

//CPF
function validaCPF(cpf){
    if (cpf.length != 11){
        return false;
    } else {

        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);

        var soma = 0;
        for (var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        //Validação do primeiro digito
        if (resultado != digitos.charAt(0)) {
            return false;
        }

        soma = 0;
        numeros = cpf.substring(0, 10);

        for (var k = 11; k > 1; k--){
            soma += numeros.charAt(11 - k) * k;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        //Validação segundo digito
        if (resultado != digitos.charAt(1)){
            return false;
        }
        return true;
    }
    
}

function validateCPF() {
    console.log('Iniciando validação CPF');
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';
   
   const cpf = document.getElementById('cpf_digitado').value;
   
   const resultadoValidacao = validaCPF(cpf);

   if (resultadoValidacao) {
       document.getElementById('success').style.display = 'block';
   } else {
       document.getElementById('error').style.display = 'block';
   }
}


document.getElementById('form').addEventListener('submit', handleSubmit);

function formDataToJson(formData) {
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    return JSON.stringify(data);
}

async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('form'));
    const data = formDataToJson(formData);

    try {
        fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then((response) => {
            console.log(response)
        })
    } catch (e) {
        console.log(e)
    }
} 