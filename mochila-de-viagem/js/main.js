const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(elemento => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento)=> {
    evento.preventDefault()
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        atualizaElemento(itemAtual, existe)

    }  else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }  

    atualizaStorage()

    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade    
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome
  

    lista.appendChild(novoItem)
    novoItem.appendChild(botaoDeleta(item.id))
}

function atualizaElemento(item, existe){
    let novaQuantidade = parseInt(item.quantidade) + parseInt(existe.quantidade)
    document.querySelector("[data-id='"+item.id+"']").innerHTML = novaQuantidade
    itens[item.id].quantidade = novaQuantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText="X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    atualizaStorage()   
    
}

function atualizaStorage(){
    localStorage.setItem("itens", JSON.stringify(itens))
}