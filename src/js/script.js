//......ÂNCORAS DA TELA.....//

let ancoraCarrinho = document.getElementsByClassName("containerCarrinho")[0]

const ulVitrine = document.getElementsByTagName("ul")[0]

const searchSection = document.getElementsByClassName("containerBuscaPorNome")[0]

const inputSearch = document.getElementsByClassName("campoBuscaPorNome")[0]

const divButtonsFilter = document.getElementById("botoesContainer")


//.....CHAMADAS E EVENTOS....//

displayCards(produtos)

creatShopHeader ()

renderizarCarrinhoVazio()

divButtonsFilter.addEventListener("click", event => {
    if(event.target.tagName == "BUTTON"){
        let section = event.target.innerText.slice(0,3)
        let filteredList = filterSection(produtos, section)
        filteredList.length > 0 ? (displayCards(filteredList)) : (displayCards(produtos))

    }
})

searchSection.addEventListener("click", event => {    
  if(event.target.tagName == "IMG" || event.target.tagName == "BUTTON"){
    let searchedWord = inputSearch.value.toLowerCase()
    let returnedList = searchProduct(produtos,searchedWord)
    displayCards(returnedList)
}
})

inputSearch.addEventListener("keypress", event =>{
  if(event.key == "Enter"){
    let searchedWord = inputSearch.value.toLowerCase().replace("ç","c").replace("ã","a")
    let returnedList = searchProduct(produtos,searchedWord)
    displayCards(returnedList)  
    }
})

let listaCarrinho = []
ulVitrine.addEventListener("click", (event)=>{
  if(event.target.tagName == "BUTTON"){
    let productID = event.target.id
    let produto = acharProduto(produtos,productID)
    listaCarrinho.push(produto)
    renderizarCarrinho (listaCarrinho)
  }
})

ancoraCarrinho.addEventListener("click", (event)=>{
  if(event.target.tagName == "BUTTON" || event.target.tagName == "IMG"){
    let productID = event.target.id

    let indexProduto = listaCarrinho.findIndex((element)=>{
      return element.id == productID
    })

    listaCarrinho.splice(indexProduto,1)

    

    if(listaCarrinho.length == 0){
      ancoraCarrinho.innerHTML =""
      creatShopHeader()
      renderizarCarrinhoVazio()
    } else{
      
      renderizarCarrinho (listaCarrinho)
    }
    }
  }
)

//.....FUNÇÕES.....//

function creatDisplayCard (product){
    let liCard = document.createElement("li")
    let img = document.createElement("img")
    let h3Name = document.createElement("h3")
    let spanSection = document.createElement("span")
    let ol = creatComponentList(product)
    let div = document.createElement("div")
    let pPrice = document.createElement("p")
    let button = document.createElement("button")

    img.src = product.img
    img.alt = `Imagem ${product.nome}`

    h3Name.innerText = product.nome
    spanSection.innerText = product.secao

    pPrice.innerText = `R$ ${product.preco}`
    button.innerText = "Comprar"
    button.id = product.id

    div.append(pPrice,button)
    liCard.append(img,h3Name,spanSection,ol,div)

    return liCard
}

function creatComponentList (product){
  
  function creatItems(component){
    let li = document.createElement("li")
    li.innerHTML = component
    return li
  }

  let ol = document.createElement("ol")
  let contentList = product.componentes

  contentList.forEach(component =>{
    let li = creatItems(component)
    ol.append(li)
  })
  return ol
}

function displayCards (productList){


    ulVitrine.innerText = ""
    productList.forEach(product => {
        let card = creatDisplayCard(product)
        ulVitrine.append(card)
    })

}

function creatShopHeader (){
  let div = document.createElement("div")
  div.classList.add("containerCarrinho__header")
  div.innerHTML = `<img src="./src/img/carrinho.png" alt="shopping_cart">
  <h2>Carrinho</h2>`

  ancoraCarrinho.append(div)
}

function renderizarCarrinhoVazio(){
  let div = document.createElement("div")
  div.classList.add("containerCarrinho__vazio")
  div.innerHTML = `<img src="./src/img/shopping-bag.png" alt="">
  <p>Por enquanto não temos produtos no carrinho</p>`

  ancoraCarrinho.append(div)

}

function creatShopCard(product){
  let liCard = document.createElement("li")
  let img = document.createElement("img")
  let divInfosBotao = document.createElement("div")
  let divDescricao = document.createElement("div")
  let h3Name = document.createElement("h3")
  let spanSection = document.createElement("span")  
  let pPrice = document.createElement("p")
  let button = document.createElement("button")
  let imgTrash = document.createElement("img")

  img.src = product.img
  img.alt = `Imagem ${product.nome}`

  divInfosBotao.classList.add("carrinho__infosBotao")

  divDescricao.classList.add("carrinho__descricao")
  h3Name.innerText = product.nome
  spanSection.innerText = product.secao
  pPrice.innerText = `R$ ${product.preco}`

  imgTrash.src = "./src/img/trash.png"
  imgTrash.alt = "trash bin"
  imgTrash.id = product.id
  button.id = product.id
  
  divDescricao.append(h3Name,spanSection,pPrice)
  button.append(imgTrash)
  divInfosBotao.append(divDescricao,button)
  
  liCard.append(img,divInfosBotao)

  return liCard
}

function shopTotals (lista){
  
  let quantidadeTotal = lista.length
  let valorTotal = lista.reduce((acc, act)=>{
    return acc += Number(act.preco)
  },0)

  let div = document.createElement("div")
  div.classList.add("containerCarrinho__totais")
  div.innerHTML = `
  <p>Quantidade:</p>
  <p>${quantidadeTotal}</p>
  <p>Total:</p>
  <p>R$ ${valorTotal},00</p> `

  return div
  
}

function renderizarCarrinho (lista){
  ancoraCarrinho.innerHTML = ""
  creatShopHeader()

  let ul = document.createElement("ul")
  ul.classList.add("containerCarrinho__comItens")
  

  lista.forEach((product) => {
    let card = creatShopCard(product)
    ul.append(card)
  })

  let divShopTotals = shopTotals(lista)

  ancoraCarrinho.append(ul, divShopTotals)

  
}

function filterSection (productList, section){
    return productList.filter(product => {
        if(product.secao.includes(section)){
            return true
        }
    })
}

function searchProduct (productList, word){
  return productList.filter(product => {
    if(product.nome.toLowerCase().replace("ç","c").replace("ã","a").includes(word)|| product.secao.toLowerCase().includes(word)|| product.categoria.toLowerCase().includes(word)){
      return true
    }
  })
}

function acharProduto (produtos,index){

  return produtos.find(product =>{
    if(product.id == index ){
           return true
         }
  })
}
















