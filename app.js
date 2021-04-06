submit_button = document.querySelector('#app form button')

zip_code_field = document.querySelector('#app form input')

content = document.querySelector('#app main')

submit_button.addEventListener('click', run)

function run(event) {
    event.preventDefault()
    zip_code = zip_code_field.value
    zip_code = zip_code.replace(' ', '')
    zip_code = zip_code.replace('.', '')
    zip_code = zip_code.trim()
    console.log(zip_code)

    axios.get(`https://viacep.com.br/ws/${zip_code}/json/`).then(function(response) {
        
        content.innerHTML = ''

        if (response.data.erro) {
            throw new Error('CEP inválido')
        }
        else {
           createLine(response.data.logradouro + " - " + response.data.bairro)
            createLine(response.data.localidade + " - " + response.data.uf)
            createLine('Brasil') 
        }

        
        

    }).catch(function(error){
        content.innerHTML = ''
        createLine("Ops, algo deu errado!")
        content.firstChild.style.color = 'red'
    })
}


function createLine(conteudo) {
    var line = document.createElement('p')
    var text = document.createTextNode(conteudo)

    line.appendChild(text)
    content.appendChild(line)
}