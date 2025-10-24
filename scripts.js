
const list = document.querySelector('ul');
const buttonShowAll = document.querySelector('.show-all')
const buttonMapAll = document.querySelector('.map-all')
const buttonSumAll = document.querySelector('.sum-all')
const buttonFilterAll = document.querySelector('.filter-itens')

buttonMapAll.style.display = 'none'
let carrinho = [];

function formatCurrency(value) {
    return value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    })
}

function showAll(productsArray) {
    let myLi = ''

    productsArray.forEach(product => {
        myLi += `
                    <li>
                        <img src=${product.src}>
                        <p>${product.name}</p>
                        <p class="item-price">R$ ${formatCurrency(product.price)}</p>
                    </li>
                `
    })

    list.innerHTML = myLi

    const items = document.querySelectorAll('li');
    items.forEach((li, index) => {
        li.addEventListener('click', () => toggleCarrinho(productsArray[index], li));
    });
}

function toggleCarrinho(produto, liElement) {
    const index = carrinho.findIndex(item => item.name === produto.name);
    if (index >= 0) {
        carrinho.splice(index, 1);
        liElement.style.borderColor = "#8133ff"; // volta ao padrão
    } else {
        carrinho.push(produto);
        liElement.style.borderColor = "#22f745"; // verde = selecionado
    }
}

function sumAllItems() {
    if (carrinho.length === 0) {
        alert("Selecione pelo menos um produto!");
        return;
    }

    const totalValue = carrinho.reduce((acc, curr) => acc + curr.price, 0);

    // 🔹 Cria o HTML com as imagens dos produtos selecionados
    let resumoHTML = '<li><h3 style="color:#fff; margin-top:45px; font-size:23px; text-align:center;">Itens <br> selecionados <br>por <br> você:</h3></li>';
    carrinho.forEach(item => {
        resumoHTML += `
            <li style="border-color:#22f745;">
                <img src="${item.src}" alt="${item.name}">
                <p>${item.name}</p>
                <p class="item-price">${formatCurrency(item.price)}</p>
            </li>
        `;
    });

    // 🔹 Adiciona o total abaixo das imagens
    resumoHTML += `
        <li style="grid-column: 1 / -1; text-align:center;">
            <p style="font-size:20px; color:#fff; margin-top:15px;">
                Valor total dos itens selecionados: <strong>${formatCurrency(totalValue)}</strong>
            </p>
        </li>
    `;

    list.innerHTML = resumoHTML;

    // 🔹 Mostra o botão de desconto
    buttonMapAll.style.display = 'inline-block';

    // Guarda o total atual
    window.totalAtual = totalValue;
}

function aplicarDesconto() {
    if (!window.totalAtual) {
        alert("Calcule o total antes de aplicar o desconto!");
        return;
    }

    const totalComDesconto = window.totalAtual * 0.9;
//#22f745
    list.innerHTML += `
        <li style="grid-column: 1 / -1; text-align:center;">
            <p style="font-size:20px; color:#000000; margin-top:10px;"> 
                Valor com 10% de desconto: <strong>${formatCurrency(totalComDesconto)}</strong>
            </p>
        </li>
    `;
}

function filterVegan() {
    const filterJustVegan = menuOptions.filter(product => product.vegan)
    showAll(filterJustVegan)
    buttonMapAll.style.display = 'none'
    carrinho = [];
}

buttonShowAll.addEventListener('click', () => {
    showAll(menuOptions)
    buttonMapAll.style.display = 'none' // Esconde o desconto
    carrinho = [];
})


buttonMapAll.addEventListener('click', aplicarDesconto)
buttonSumAll.addEventListener('click', sumAllItems)
buttonFilterAll.addEventListener('click', filterVegan)
