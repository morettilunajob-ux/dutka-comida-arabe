const DADOS = {
  nome: "Dutka",
  subtitulo: "Comida Árabe",
  chamada: "Shawarma e kibe de verdade, em Pontal do Paraná.",

  contato: {
    telefone: "(41) 99666-0287",
    telefoneLink: "+5541996660287",
    whatsapp: null,            // PENDENTE — confirmar com o dono
    instagram: null            // PENDENTE — confirmar com o dono
  },

  endereco: {
    rua: "Av. Itanhaém, 188",
    bairro: "Balneário",
    cidade: "Pontal do Paraná",
    estado: "PR",
    cep: "83255-000",
    lat: -25.6161047,
    lng: -48.419519
  },

  // Aberto todos os dias, mesmo horário
  horario: { abre: 18, fecha: 23 },

  avaliacoes: {
    nota: "5,0",
    total: 13,
    fonte: "Google"
  },

  // PENDENTE: preços e descrições vêm do dono.
  // Estes 4 pratos foram citados nominalmente por clientes. NÃO ACRESCENTAR OUTROS.
  cardapio: [
    {
      categoria: "Shawarma",
      nota: "Porção generosa — é refeição completa, não lanche.",
      itens: [
        { nome: "Shawarma de Falafel", descricao: null, preco: null },
        { nome: "Shawarma Misto",      descricao: null, preco: null }
      ]
    },
    {
      categoria: "Salgados Árabes",
      nota: null,
      itens: [
        { nome: "Kibe Recheado com Queijo", descricao: "O mais elogiado da casa.", preco: null },
        { nome: "Kafta",                    descricao: null, preco: null }
      ]
    }
  ],

  depoimentos: [
    { texto: "Simplesmente o melhor shawarma que já comi na vida! Comi o de falafel e o meu marido comeu o misto, ambos incríveis.", autor: "Julia" },
    { texto: "Comida árabe autêntica e deliciosa. O atendimento é familiar. Um destaque para o kibe recheado.", autor: "RB · Local Guide" }
  ],

  servicos: ["Refeição no local", "Retirada na porta"]
};
