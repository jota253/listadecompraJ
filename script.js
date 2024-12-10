document.addEventListener("DOMContentLoaded", carregarLista);

const listaInicial = [
    { nome: "Banana", imagem: "banana.jpeg" },
    { nome: "Maçã", imagem: "maca.jpeg" },
    { nome: "Ovo", imagem: "ovo.jpeg" },
    { nome: "Leite", imagem: "leite.jpg" },
    { nome: "Uva", imagem: "uva.jpeg" }
];

function carregarLista() {
    let lista = JSON.parse(localStorage.getItem("listaCompras"));
    
    // Se não houver lista salva no localStorage, usa a lista inicial
    if (!lista || lista.length === 0) {
        lista = listaInicial;
        localStorage.setItem("listaCompras", JSON.stringify(lista));
    }

    // Limpa a lista atual na tela antes de carregá-la
    document.getElementById("lista-compras").innerHTML = "";
    lista.forEach(item => adicionarItemNaTela(item.nome, item.imagem));
}

function adicionarItem() {
    const novoItem = document.getElementById("novo-item").value;
    const urlImagem = document.getElementById("url-imagem").value || "padrao.jpg";
    if (novoItem) {
        const item = { nome: novoItem, imagem: urlImagem };
        adicionarItemNaTela(item.nome, item.imagem);
        salvarItemLocalStorage(item);
        document.getElementById("novo-item").value = ""; // Limpa o campo de nome
        document.getElementById("url-imagem").value = ""; // Limpa o campo de URL da imagem
    }
}

function adicionarItemNaTela(nome, imagem) {
    const lista = document.getElementById("lista-compras");
    const li = document.createElement("li");

    const caminhoImagem = imagem.includes("http") ? imagem : `imagem/${imagem}`;
    li.innerHTML = `
        <div class="item-text">
            <img src="${caminhoImagem}" alt="${nome}" class="item-img">
            <span>${nome}</span>
        </div>
        <button onclick="removerItem(this)">Remover</button>
    `;
    lista.appendChild(li);
}

function removerItem(elemento) {
    const li = elemento.parentElement;
    const nome = li.querySelector("span").innerText;
    li.remove();
    removerItemLocalStorage(nome);
}

function salvarItemLocalStorage(item) {
    let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
    lista.push(item);
    localStorage.setItem("listaCompras", JSON.stringify(lista));
}

function removerItemLocalStorage(nome) {
    let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
    lista = lista.filter(item => item.nome !== nome);
    localStorage.setItem("listaCompras", JSON.stringify(lista));
}

function restaurarLista() {
    // Restaura a lista inicial e exibe novamente
    localStorage.setItem("listaCompras", JSON.stringify(listaInicial));
    carregarLista();
}
