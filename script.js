var temas = {
  escuro: "style.css",
  claro: "style-tema-claro.css",
  editorial: "style-tema-editorial.css",
};

var catalogo = [
  {
    id: 1,
    marca: "Maison Francis Kurkdjian",
    nome: "Baccarat Rouge 540",
    categoria: "Unissex",
    familiaOlfativa: "Floral Amadeirado",
    notas: "Jasmim, Açafrão, Cedro, Âmbar Gris",
    preco: 2450.0,
    precoOriginal: 2800.0,
    imagem:
      "https://acdn-us.mitiendanube.com/stores/002/652/199/products/design-sem-nome-2024-02-22t130549-569-9a9d05687801c4565a17086179586872-1024-1024.webp",
  },
  {
    id: 2,
    marca: "Creed",
    nome: "Aventus",
    categoria: "Masculino",
    familiaOlfativa: "Chipre Frutado",
    notas: "Abacaxi, Bétula, Almíscar, Musgo de Carvalho",
    preco: 3100.0,
    precoOriginal: 3500.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUlGgFXnQvDB2vG5CzwtQiU0Hmp6mQCyB3CAHQa8fALQ&s",
  },
  {
    id: 3,
    marca: "Tom Ford",
    nome: "Tobacco Vanille",
    categoria: "Unissex",
    familiaOlfativa: "Oriental Especiado",
    notas: "Folha de Tabaco, Baunilha, Cacau, Fava Tonka",
    preco: 2150.0,
    precoOriginal: 2400.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10utiFaKKhd_zHlavJE2UE68TYfgWjaj6UdYj4rGjuQ&s=10",
  },
  {
    id: 4,
    marca: "Le Labo",
    nome: "Santal 33",
    categoria: "Unissex",
    familiaOlfativa: "Amadeirado Aromático",
    notas: "Sândalo, Cedro, Cardamomo, Violeta",
    preco: 1890.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQMY3dif608Mrzt1BWEWKUTd97UqdL6__zdipd2jJN5Q&s=10",
  },
  {
    id: 5,
    marca: "Roja Parfums",
    nome: "Elysium",
    categoria: "Masculino",
    familiaOlfativa: "Fougère Aromático",
    notas: "Toranja, Vetiver, Âmbar Gris, Groselha Preta",
    preco: 4200.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpGSd7z_xqVnBjVjUNm9eqmknIxpg_EwsVg3bOV2kUw&s=10",
  },
  {
    id: 6,
    marca: "Kilian",
    nome: "Love, Don't Be Shy",
    categoria: "Feminino",
    familiaOlfativa: "Oriental Floral",
    notas: "Néroli, Flor de Laranjeira, Marshmallow, Baunilha",
    preco: 2350.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6t76gpSxReAx3HtVLhOvAuY_1PwQxHmZvEGls4XonVg&s=10",
  },
  {
    id: 7,
    marca: "Parfums de Marly",
    nome: "Layton",
    categoria: "Masculino",
    familiaOlfativa: "Oriental Floral",
    notas: "Maçã, Lavanda, Baunilha, Pimenta Rosa",
    preco: 2100.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSql81fhNuAdi1T4Q_cblLqFIJVSFe-MD9LoQofmUy8VA&s=10",
  },
  {
    id: 8,
    marca: "Amouage",
    nome: "Interlude Man",
    categoria: "Masculino",
    familiaOlfativa: "Amadeirado Especiado",
    notas: "Orégano, Incenso, Opoponax, Couro",
    preco: 2850.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnaarX5NLP4O7KYAzJu6gz3jpfHqkYMod8BU_UpSgJxg&s=10",
  },
  {
    id: 9,
    marca: "Byredo",
    nome: "Gypsy Water",
    categoria: "Unissex",
    familiaOlfativa: "Amadeirado Aromático",
    notas: "Bergamota, Zimbro, Agulhas de Pinheiro, Sândalo",
    preco: 1950.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9c7q5KHqBlQldcfIpv7hmcoL6kt7djcI5kUCI1yNJw&s=10",
  },
];

var carrinho = [];
var categoriaAtual = "todos";
var buscaAtual = "";
var timeoutNotificacao;
var intervaloPix;

function iniciar() {
  carregarCarrinhoDoNavegador();
  configurarEventos();
  configurarTrocaDeTema();
  renderizarProdutos();
  atualizarInterfaceCarrinho();
  lucide.createIcons();
}

function salvarCarrinhoNoNavegador() {
  localStorage.setItem("lordore_carrinho", JSON.stringify(carrinho));
}

function carregarCarrinhoDoNavegador() {
  var salvo = localStorage.getItem("lordore_carrinho");
  if (salvo) {
    try {
      carrinho = JSON.parse(salvo);
    } catch (e) {
      carrinho = [];
    }
  }
}

function mostrarNotificacao(mensagem) {
  var notificacao = document.getElementById("notificacao-toast");
  var textoNotificacao = document.getElementById("mensagem-toast");

  if (timeoutNotificacao) {
    clearTimeout(timeoutNotificacao);
  }

  textoNotificacao.textContent = mensagem;
  notificacao.classList.add("mostrar");

  timeoutNotificacao = setTimeout(function () {
    notificacao.classList.remove("mostrar");
  }, 3000);
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function obterProdutosFiltrados() {
  var filtrados = catalogo;

  if (categoriaAtual !== "todos") {
    filtrados = filtrados.filter(function (produto) {
      return produto.categoria === categoriaAtual;
    });
  }

  if (buscaAtual.trim() !== "") {
    var termoBusca = buscaAtual.toLowerCase();
    filtrados = filtrados.filter(function (produto) {
      return (
        produto.nome.toLowerCase().includes(termoBusca) ||
        produto.marca.toLowerCase().includes(termoBusca) ||
        produto.notas.toLowerCase().includes(termoBusca)
      );
    });
  }

  return filtrados;
}

function renderizarProdutos() {
  var gradeDeProdutos = document.getElementById("grade-produtos");
  var contadorProdutos = document.getElementById("contador-produtos");
  var semResultados = document.getElementById("sem-resultados");

  var produtosParaExibir = obterProdutosFiltrados();

  contadorProdutos.textContent =
    "Mostrando " + produtosParaExibir.length + " fragrância(s)";

  if (produtosParaExibir.length === 0) {
    gradeDeProdutos.innerHTML = "";
    semResultados.classList.remove("oculto");
    return;
  }

  semResultados.classList.add("oculto");
  gradeDeProdutos.innerHTML = "";

  for (var i = 0; i < produtosParaExibir.length; i++) {
    var produto = produtosParaExibir[i];

    var cartao = document.createElement("article");
    cartao.className = "cartao-produto revelado";

    cartao.innerHTML =
      '<div class="container-imagem-produto">' +
      '<span class="etiqueta-categoria">' +
      produto.categoria +
      "</span>" +
      '<img src="' +
      produto.imagem +
      '" alt="' +
      produto.nome +
      " - " +
      produto.marca +
      '" class="imagem-produto" loading="lazy">' +
      "</div>" +
      '<div class="info-produto">' +
      '<span class="marca-produto">' +
      produto.marca +
      "</span>" +
      '<h3 class="nome-produto">' +
      produto.nome +
      "</h3>" +
      '<p class="familia-olfativa-produto">' +
      produto.familiaOlfativa +
      "</p>" +
      '<p class="notas-produto">' +
      produto.notas +
      "</p>" +
      '<div class="rodape-produto">' +
      '<span class="preco-produto">' +
      formatarPreco(produto.preco) +
      "</span>" +
      '<button class="btn-adicionar-carrinho" data-id="' +
      produto.id +
      '" aria-label="Adicionar ' +
      produto.nome +
      ' ao carrinho">' +
      "<span>Adicionar ao Carrinho</span>" +
      "</button>" +
      "</div>" +
      "</div>";

    gradeDeProdutos.appendChild(cartao);
  }

  lucide.createIcons();
}

function adicionarAoCarrinho(idProduto) {
  carrinho.push(idProduto);
  salvarCarrinhoNoNavegador();
  atualizarInterfaceCarrinho();
}

function removerDoCarrinho(idProduto, removerTudo) {
  if (removerTudo) {
    carrinho = carrinho.filter(function (id) {
      return id !== idProduto;
    });
  } else {
    var ultimoIndice = carrinho.lastIndexOf(idProduto);
    if (ultimoIndice !== -1) {
      carrinho.splice(ultimoIndice, 1);
    }
  }
  salvarCarrinhoNoNavegador();
  atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
  var contadorCart = document.getElementById("contador-carrinho");
  var containerItens = document.getElementById("container-itens-carrinho");
  var valorSubtotal = document.getElementById("valor-subtotal-carrinho");
  var valorTotal = document.getElementById("valor-total-carrinho");
  var btnIrPagamento = document.getElementById("btn-ir-pagamento");
  var linhaEconomia = document.getElementById("linha-economia-carrinho");
  var valorEconomia = document.getElementById("valor-economia-carrinho");

  contadorCart.textContent = carrinho.length;

  if (carrinho.length === 0) {
    containerItens.innerHTML =
      '<div class="estado-carrinho-vazio">' +
      '<i data-lucide="shopping-bag"></i>' +
      "<p>Sua coleção está vazia.</p>" +
      '<button class="btn-secundario-contorno" id="btn-fechar-carrinho-vazio">Descobrir Fragrâncias</button>' +
      "</div>";
    valorSubtotal.textContent = "R$ 0,00";
    valorTotal.textContent = "R$ 0,00";
    btnIrPagamento.disabled = true;

    if (linhaEconomia) {
      linhaEconomia.classList.add("oculto");
    }
    lucide.createIcons();

    var btnVazio = document.getElementById("btn-fechar-carrinho-vazio");
    if (btnVazio) {
      btnVazio.addEventListener("click", fecharCarrinho);
    }
    return;
  }

  btnIrPagamento.disabled = false;
  containerItens.innerHTML = "";

  var itensUnicos = catalogo.filter(function (produto) {
    return carrinho.includes(produto.id);
  });

  var precoTotal = 0;
  var precoTotalOriginal = 0;
  for (var i = 0; i < carrinho.length; i++) {
    var item = catalogo.find(function (p) {
      return p.id === carrinho[i];
    });
    if (item) {
      precoTotal = precoTotal + item.preco;
      if (item.precoOriginal) {
        precoTotalOriginal = precoTotalOriginal + item.precoOriginal;
      } else {
        precoTotalOriginal = precoTotalOriginal + item.preco;
      }
    }
  }

  var economia = precoTotalOriginal - precoTotal;

  if (linhaEconomia && valorEconomia) {
    if (economia > 0) {
      linhaEconomia.classList.remove("oculto");
      valorEconomia.textContent = "- " + formatarPreco(economia);
    } else {
      linhaEconomia.classList.add("oculto");
    }
  }

  for (var j = 0; j < itensUnicos.length; j++) {
    var produto = itensUnicos[j];

    var quantidade = carrinho.filter(function (id) {
      return id === produto.id;
    }).length;

    var htmlPreco =
      '<div class="preco-item-carrinho">' +
      formatarPreco(produto.preco) +
      "</div>";

    if (produto.precoOriginal && produto.precoOriginal > produto.preco) {
      htmlPreco =
        '<div class="preco-item-carrinho">' +
        '<span style="text-decoration: line-through; font-size: 0.75rem; color: var(--text-secondary); margin-right: 4px;">' +
        formatarPreco(produto.precoOriginal) +
        "</span>" +
        '<span style="color: var(--color-success);">' +
        formatarPreco(produto.preco) +
        "</span>" +
        "</div>";
    }

    var elItem = document.createElement("div");
    elItem.className = "cartao-item-carrinho";
    elItem.innerHTML =
      '<img src="' +
      produto.imagem +
      '" alt="' +
      produto.nome +
      '" class="miniatura-item-carrinho">' +
      '<div class="detalhes-item-carrinho">' +
      '<span class="marca-item-carrinho">' +
      produto.marca +
      "</span>" +
      '<h4 class="nome-item-carrinho">' +
      produto.nome +
      "</h4>" +
      htmlPreco +
      '<div class="controles-item-carrinho">' +
      '<button class="btn-quantidade remover-quantidade" data-id="' +
      produto.id +
      '" aria-label="Diminuir quantidade">-</button>' +
      '<span class="exibicao-quantidade">' +
      quantidade +
      "</span>" +
      '<button class="btn-quantidade adicionar-quantidade" data-id="' +
      produto.id +
      '" aria-label="Aumentar quantidade">+</button>' +
      '<button class="btn-remover-item" data-id="' +
      produto.id +
      '" aria-label="Remover item">' +
      '<i data-lucide="trash-2"></i>' +
      "</button>" +
      "</div>" +
      "</div>";

    containerItens.appendChild(elItem);
  }

  valorSubtotal.textContent = formatarPreco(precoTotal);
  valorTotal.textContent = formatarPreco(precoTotal);

  atualizarInterfacePagamento(itensUnicos, precoTotal);
  lucide.createIcons();
}

function atualizarInterfacePagamento(itensUnicos, precoTotal) {
  var listaResumo = document.getElementById("lista-resumo-pagamento");
  var subtotalPagamento = document.getElementById("subtotal-pagamento");
  var totalPagamento = document.getElementById("valor-total-pagamento");

  listaResumo.innerHTML = "";

  for (var i = 0; i < itensUnicos.length; i++) {
    var produto = itensUnicos[i];
    var quantidade = carrinho.filter(function (id) {
      return id === produto.id;
    }).length;

    var linhaItem = document.createElement("div");
    linhaItem.className = "item-resumo-pagamento";
    linhaItem.innerHTML =
      '<div style="flex: 1;">' +
      '<span style="font-size:0.7rem; color:var(--gold-primary); text-transform:uppercase;">' +
      produto.marca +
      "</span>" +
      '<h4 style="font-family:var(--font-serif); font-size:1.1rem; font-weight:400;">' +
      produto.nome +
      ' <span style="color:var(--text-secondary); font-family:var(--font-sans); font-size:0.8rem;">x' +
      quantidade +
      "</span></h4>" +
      "</div>" +
      '<div style="font-weight:500;">' +
      formatarPreco(produto.preco * quantidade) +
      "</div>";

    listaResumo.appendChild(linhaItem);
  }

  subtotalPagamento.textContent = formatarPreco(precoTotal);
  totalPagamento.textContent = formatarPreco(precoTotal);

  atualizarParcelas(precoTotal);
}

function atualizarParcelas(total) {
  var selecaoParc = document.getElementById("select-parcelamento");
  if (!selecaoParc) return;

  selecaoParc.innerHTML = "";

  for (var i = 1; i <= 12; i++) {
    var valorParcela = total / i;
    var opcao = document.createElement("option");
    opcao.value = i;
    opcao.textContent =
      i + "x de " + formatarPreco(valorParcela) + " sem juros";
    selecaoParc.appendChild(opcao);
  }
}

function iniciarCronometroPix() {
  clearInterval(intervaloPix);

  var tempo = 600;
  var mostrador = document.getElementById("contador-tempo-pix");
  if (!mostrador) return;

  mostrador.textContent = "10:00";

  intervaloPix = setInterval(function () {
    var minutos = Math.floor(tempo / 60);
    var segundos = tempo % 60;

    if (minutos < 10) minutos = "0" + minutos;
    if (segundos < 10) segundos = "0" + segundos;

    mostrador.textContent = minutos + ":" + segundos;

    tempo = tempo - 1;

    if (tempo < 0) {
      clearInterval(intervaloPix);
      mostrador.textContent = "00:00";
    }
  }, 1000);
}

function abrirCarrinho() {
  var lateral = document.getElementById("barra-lateral-carrinho");
  lateral.classList.add("aberto");
  lateral.setAttribute("aria-hidden", "false");

  var fundo = document.getElementById("camada-sobreposicao");
  if (fundo) {
    fundo.classList.add("ativo");
  }

  var btnFechar = document.getElementById("btn-fechar-carrinho");
  setTimeout(function () {
    btnFechar.focus();
  }, 100);
}

function fecharCarrinho() {
  var lateral = document.getElementById("barra-lateral-carrinho");
  lateral.classList.remove("aberto");
  lateral.setAttribute("aria-hidden", "true");

  var fundo = document.getElementById("camada-sobreposicao");
  if (fundo) {
    fundo.classList.remove("ativo");
  }

  var btnCar = document.getElementById("btn-abrir-carrinho");
  if (btnCar) btnCar.focus();
}

function irParaPagamento() {
  var vistaCar = document.getElementById("vista-carrinho");
  var vistaPag = document.getElementById("vista-pagamento");
  var lateral = document.getElementById("barra-lateral-carrinho");

  vistaCar.classList.add("oculto");
  vistaPag.classList.remove("oculto");
  vistaPag.setAttribute("aria-hidden", "false");

  lateral.classList.add("tela-cheia");
  lateral.style.width = "100vw";
}

function voltarDoPagamento() {
  var vistaCar = document.getElementById("vista-carrinho");
  var vistaPag = document.getElementById("vista-pagamento");
  var lateral = document.getElementById("barra-lateral-carrinho");

  vistaPag.classList.add("oculto");
  vistaPag.setAttribute("aria-hidden", "true");
  lateral.classList.remove("tela-cheia");
  vistaCar.classList.remove("oculto");
  lateral.style.width = "";
}

function finalizarCompra() {
  var conteudoPagamento = document.getElementById("conteudo-pagamento");
  var telaSucesso = document.getElementById("mensagem-sucesso");
  var detalhesSucesso = document.getElementById("texto-detalhes-sucesso");
  var totalSucesso = document.getElementById("texto-total-sucesso");

  conteudoPagamento.classList.add("oculto");

  telaSucesso.classList.remove("oculto");
  telaSucesso.setAttribute("aria-hidden", "false");

  var itensComprados = catalogo.filter(function (produto) {
    return carrinho.includes(produto.id);
  });

  var nomesItens = [];
  for (var i = 0; i < itensComprados.length; i++) {
    var p = itensComprados[i];
    var qtd = carrinho.filter(function (id) {
      return id === p.id;
    }).length;
    nomesItens.push(p.nome + " (x" + qtd + ")");
  }

  detalhesSucesso.textContent = nomesItens.join(" • ");

  var totalPago = 0;
  for (var j = 0; j < carrinho.length; j++) {
    var item = catalogo.find(function (p) {
      return p.id === carrinho[j];
    });
    if (item) {
      totalPago = totalPago + item.preco;
    }
  }
  totalSucesso.textContent = "Total Pago: " + formatarPreco(totalPago);

  carrinho = [];
  salvarCarrinhoNoNavegador();
}

function retornarParaLoja() {
  var telaSucesso = document.getElementById("mensagem-sucesso");
  var conteudoPag = document.getElementById("conteudo-pagamento");
  var vistaPag = document.getElementById("vista-pagamento");
  var vistaCar = document.getElementById("vista-carrinho");
  var lateral = document.getElementById("barra-lateral-carrinho");

  telaSucesso.classList.add("oculto");
  telaSucesso.setAttribute("aria-hidden", "true");
  conteudoPag.classList.remove("oculto");
  vistaPag.classList.add("oculto");
  vistaCar.classList.remove("oculto");
  lateral.classList.remove("tela-cheia");
  lateral.style.width = "";

  fecharCarrinho();
  atualizarInterfaceCarrinho();
}

function configurarEventos() {
  var linksMenu = document.querySelectorAll(".link-navegacao");
  for (var i = 0; i < linksMenu.length; i++) {
    linksMenu[i].addEventListener("click", function (evento) {
      for (var j = 0; j < linksMenu.length; j++) {
        linksMenu[j].classList.remove("ativo");
      }
      evento.currentTarget.classList.add("ativo");

      categoriaAtual = evento.currentTarget.dataset.category;
      renderizarProdutos();

      document
        .getElementById("secao-catalogo")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      var cabecalho = document.getElementById("cabecalho-site");
      if (window.scrollY > 50) {
        cabecalho.classList.add("rolado");
      } else {
        cabecalho.classList.remove("rolado");
      }
    },
    { passive: true },
  );

  var btnAbrirBusca = document.getElementById("btn-abrir-busca");
  var btnFecharBusca = document.getElementById("btn-fechar-busca");
  var painelBusca = document.getElementById("painel-busca");
  var inputBusca = document.getElementById("input-busca");

  btnAbrirBusca.addEventListener("click", function () {
    painelBusca.classList.add("aberto");
    btnAbrirBusca.setAttribute("aria-expanded", "true");
    inputBusca.focus();
  });

  btnFecharBusca.addEventListener("click", function () {
    painelBusca.classList.remove("aberto");
    btnAbrirBusca.setAttribute("aria-expanded", "false");
    if (buscaAtual !== "") {
      buscaAtual = "";
      inputBusca.value = "";
      renderizarProdutos();
    }
  });

  var delayBusca;
  inputBusca.addEventListener("input", function (evento) {
    clearTimeout(delayBusca);
    delayBusca = setTimeout(function () {
      buscaAtual = evento.target.value;
      renderizarProdutos();
      if (buscaAtual.trim() !== "") {
        document
          .getElementById("secao-catalogo")
          .scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  });

  var btnLimpar = document.getElementById("btn-limpar-filtros");
  if (btnLimpar) {
    btnLimpar.addEventListener("click", function () {
      buscaAtual = "";
      inputBusca.value = "";
      categoriaAtual = "todos";
      for (var k = 0; k < linksMenu.length; k++) {
        linksMenu[k].classList.remove("ativo");
      }
      linksMenu[0].classList.add("ativo");
      renderizarProdutos();
    });
  }

  var grade = document.getElementById("grade-produtos");
  grade.addEventListener("click", function (evento) {
    var btnAdd = evento.target.closest(".btn-adicionar-carrinho");
    if (btnAdd && !btnAdd.disabled) {
      var meuId = parseInt(btnAdd.dataset.id);

      btnAdd.disabled = true;
      var spanBtn = btnAdd.querySelector("span");
      spanBtn.textContent = "Adicionado ✓";

      mostrarNotificacao("Fragrância adicionada à sua coleção.");

      adicionarAoCarrinho(meuId);
      abrirCarrinho();

      setTimeout(function () {
        btnAdd.disabled = false;
        spanBtn.textContent = "Adicionar ao Carrinho";
      }, 1500);
    }
  });

  var btnAbrirLateral = document.getElementById("btn-abrir-carrinho");
  var btnFecharLateral = document.getElementById("btn-fechar-carrinho");
  var btnContComprar = document.getElementById("btn-continuar-comprando");

  btnAbrirLateral.addEventListener("click", abrirCarrinho);
  btnFecharLateral.addEventListener("click", fecharCarrinho);
  btnContComprar.addEventListener("click", fecharCarrinho);

  var sobreposicao = document.getElementById("camada-sobreposicao");
  sobreposicao.addEventListener("click", function () {
    var lateral = document.getElementById("barra-lateral-carrinho");
    if (
      lateral.classList.contains("aberto") &&
      !lateral.classList.contains("tela-cheia")
    ) {
      fecharCarrinho();
    }
  });

  var containerCarrinhoItens = document.getElementById(
    "container-itens-carrinho",
  );
  containerCarrinhoItens.addEventListener("click", function (evento) {
    var btnMais = evento.target.closest(".adicionar-quantidade");
    var btnMenos = evento.target.closest(".remover-quantidade");
    var btnLixo = evento.target.closest(".btn-remover-item");

    if (btnMais) {
      adicionarAoCarrinho(parseInt(btnMais.dataset.id));
    } else if (btnMenos) {
      removerDoCarrinho(parseInt(btnMenos.dataset.id));
    } else if (btnLixo) {
      removerDoCarrinho(parseInt(btnLixo.dataset.id), true);
    }
  });

  var btnIrCheckout = document.getElementById("btn-ir-pagamento");
  var btnVoltarCheckout = document.getElementById("btn-cancelar-pagamento");

  btnIrCheckout.addEventListener("click", irParaPagamento);
  btnVoltarCheckout.addEventListener("click", voltarDoPagamento);

  var botoesMetodo = document.querySelectorAll(".opcao-pagamento");
  for (var p = 0; p < botoesMetodo.length; p++) {
    botoesMetodo[p].addEventListener("click", function () {
      var aOpcao = this;

      for (var q = 0; q < botoesMetodo.length; q++) {
        botoesMetodo[q].classList.remove("selecionado");
      }

      aOpcao.classList.add("selecionado");

      var rad = aOpcao.querySelector('input[type="radio"]');
      if (rad) rad.checked = true;

      var oMetodo = aOpcao.dataset.method;
      var blocoPix = document.getElementById("detalhes-pix");
      var blocoCartao = document.getElementById("detalhes-cartao");

      if (oMetodo === "pix") {
        blocoPix.classList.remove("oculto");
        blocoPix.classList.add("ativo");
        blocoCartao.classList.add("oculto");
        blocoCartao.classList.remove("ativo");
        iniciarCronometroPix();
      } else {
        blocoCartao.classList.remove("oculto");
        blocoCartao.classList.add("ativo");
        blocoPix.classList.add("oculto");
        blocoPix.classList.remove("ativo");
        clearInterval(intervaloPix);
      }
    });
  }

  var btnCopia = document.getElementById("btn-copiar-pix");
  if (btnCopia) {
    btnCopia.addEventListener("click", function () {
      var entradaTexto = document.getElementById("input-copia-pix");
      entradaTexto.select();
      entradaTexto.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(entradaTexto.value);

      var originalHTML = btnCopia.innerHTML;
      btnCopia.innerHTML = '<i data-lucide="check"></i> Copiado!';
      lucide.createIcons();

      setTimeout(function () {
        btnCopia.innerHTML = originalHTML;
        lucide.createIcons();
      }, 2000);
    });
  }

  var inputCartao = document.getElementById("numero-cartao");
  var visualNumCartao = document.getElementById("numero-cartao-visual");
  var visualBandCartao = document.getElementById("bandeira-cartao-visual");

  if (inputCartao) {
    inputCartao.addEventListener("input", function (e) {
      var valor = e.target.value.replace(/\D/g, "");
      valor = valor.replace(/(\d{4})/g, "$1 ").trim();
      e.target.value = valor;

      visualNumCartao.textContent = valor || "0000 0000 0000 0000";

      if (valor.startsWith("4")) {
        visualBandCartao.className = "bandeira-cartao visa";
        visualBandCartao.textContent = "VISA";
      } else if (valor.startsWith("5")) {
        visualBandCartao.className = "bandeira-cartao master";
        visualBandCartao.textContent = "MASTER";
      } else {
        visualBandCartao.className = "bandeira-cartao";
        visualBandCartao.textContent = "";
      }
    });
  }

  var inputNome = document.getElementById("nome-cartao");
  var visualNome = document.getElementById("nome-cartao-visual");
  if (inputNome) {
    inputNome.addEventListener("input", function (e) {
      visualNome.textContent = e.target.value.toUpperCase() || "NOME IMPRESSO";
    });
  }

  var inputVal = document.getElementById("validade-cartao");
  var visualVal = document.getElementById("validade-cartao-visual");
  if (inputVal) {
    inputVal.addEventListener("input", function (e) {
      var valor = e.target.value.replace(/\D/g, "");
      if (valor.length > 2) {
        valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
      }
      e.target.value = valor;
      visualVal.textContent = valor || "MM/AA";
    });
  }

  var btnImprime = document.getElementById("btn-imprimir-recibo");
  if (btnImprime) {
    btnImprime.addEventListener("click", function () {
      window.print();
    });
  }

  var btnEsvazia = document.getElementById("btn-esvaziar-carrinho");
  if (btnEsvazia) {
    btnEsvazia.addEventListener("click", function () {
      if (confirm("Tem certeza que deseja esvaziar seu carrinho?")) {
        carrinho = [];
        salvarCarrinhoNoNavegador();
        atualizarInterfaceCarrinho();
      }
    });
  }

  var btnConfirmar = document.getElementById("btn-confirmar-compra");
  btnConfirmar.addEventListener("click", function () {
    var areaProgresso = document.getElementById(
      "container-progresso-pagamento",
    );
    var linhaProg = document.getElementById("barra-progresso-pagamento");
    var textoProg = document.getElementById("texto-progresso-pagamento");

    btnConfirmar.disabled = true;
    btnConfirmar.style.opacity = "0.4";

    areaProgresso.classList.remove("oculto");
    linhaProg.style.width = "0%";

    var passosDeValidacao = [
      { pct: 18, texto: "Validando seu carrinho..." },
      { pct: 42, texto: "Conectando com o banco..." },
      { pct: 68, texto: "Processando o pagamento..." },
      { pct: 88, texto: "Gerando sua nota fiscal..." },
      { pct: 100, texto: "Sucesso!" },
    ];

    var passoAtual = 0;
    var tempoTotalMilissegundos = 2500;
    var tempoPorPasso = tempoTotalMilissegundos / passosDeValidacao.length;

    var andamentoAnimacao = setInterval(function () {
      if (passoAtual >= passosDeValidacao.length) {
        clearInterval(andamentoAnimacao);
        setTimeout(function () {
          areaProgresso.classList.add("oculto");
          linhaProg.style.width = "0%";
          btnConfirmar.disabled = false;
          btnConfirmar.style.opacity = "";
          finalizarCompra();
        }, 400);
        return;
      }
      linhaProg.style.width = passosDeValidacao[passoAtual].pct + "%";
      textoProg.textContent = passosDeValidacao[passoAtual].texto;
      passoAtual++;
    }, tempoPorPasso);
  });

  var btnVoltarIncial = document.getElementById("btn-voltar-loja");
  btnVoltarIncial.addEventListener("click", retornarParaLoja);

  document.addEventListener("keydown", function (eventoTec) {
    if (eventoTec.key === "Escape") {
      var painelB = document.getElementById("painel-busca");
      var barraC = document.getElementById("barra-lateral-carrinho");

      if (painelB.classList.contains("aberto")) {
        btnFecharBusca.click();
      } else if (
        barraC.classList.contains("aberto") &&
        !barraC.classList.contains("tela-cheia")
      ) {
        fecharCarrinho();
      }
    }
  });

  var saudacao = document.getElementById("saudacao-topo");
  if (saudacao) {
    var hora = new Date().getHours();
    if (hora < 12) {
      saudacao.textContent =
        "Bom dia! Comece o dia com uma fragrância marcante.";
    } else if (hora < 18) {
      saudacao.textContent =
        "Boa tarde! Renove suas energias com as melhores notas.";
    } else {
      saudacao.textContent =
        "Boa noite! Prepare-se para a noite com um perfume inesquecível.";
    }
  }
}

function configurarTrocaDeTema() {
  var botoesTema = document.querySelectorAll(".btn-tema");
  var folhaDeEstilo = document.getElementById("theme-stylesheet");

  for (var i = 0; i < botoesTema.length; i++) {
    botoesTema[i].addEventListener("click", function () {
      var oTema = this.dataset.theme;

      if (temas[oTema]) {
        folhaDeEstilo.href = temas[oTema];
      }

      for (var j = 0; j < botoesTema.length; j++) {
        botoesTema[j].classList.remove("ativo");
      }
      this.classList.add("ativo");
    });
  }
}

document.addEventListener("DOMContentLoaded", iniciar);
