# Site Dutka Comida Árabe

Site estático (HTML/CSS/JS puro, sem build). Todo conteúdo do site (nome, telefone, cardápio, preços, depoimentos, horário) vem de um único arquivo: `js/dados.js`. Editar esse arquivo é o suficiente — não precisa mexer no resto.

## Como editar o cardápio

Abra `js/dados.js` num editor de texto simples. Cada prato é assim:

```
{ nome: "Shawarma de Falafel", descricao: null, preco: null }
```

- Trocar preço: `preco: null` vira `preco: 25.00` (sem "R$", só o número).
- Trocar descrição: `descricao: null` vira `descricao: "Frase curta aqui."`.
- Sempre manter as vírgulas e aspas do jeito que estão.

## Como ativar o WhatsApp

No mesmo arquivo, `whatsapp: null` vira `whatsapp: "5541999999999"` (código do país + DDD + número, sem espaço nem símbolo). O botão de WhatsApp aparece sozinho no site assim que isso for preenchido.

## Como ativar o Instagram

`instagram: null` vira `instagram: "nome_do_perfil"` (sem @).

## Pendências

- [ ] Cardápio completo com preços (parcial: pode ser visto no delivery — pedido.anota.ai)
- [ ] Fotos reais: fachada, salão, shawarma, kibe recheado, kafta
- [x] Número de WhatsApp — mesmo do telefone, (41) 99666-0287
- [x] @ do Instagram — dutkaculinariarabe
- [x] Facebook — dutkacomidaarabe
- [x] Link de delivery — pedido.anota.ai/loja/dutka-comidas-arabe
- [ ] Confirmar endereço — "Av. Itanhaém, 188" precisa de checagem
- [ ] Confirmar se abre mesmo todos os dias, inclusive domingo e feriado
