const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota principal - tudo misturado aqui
app.post('/calcular', (req, res) => {
  // Pega dados do frontend
  let data = req.body.data;
  let pequenos = req.body.pequenos;
  let grandes = req.body.grandes;
  
  // Converte para numeros
  pequenos = parseInt(pequenos);
  grandes = parseInt(grandes);
  
  console.log('Dados recebidos:', data, pequenos, grandes); // Debug
  
  // Separa a data
  let partes = data.split('/');
  let dia = parseInt(partes[0]);
  let mes = parseInt(partes[1]);
  let ano = parseInt(partes[2]);
  
  // Criando objeto Date e obtendo dia da semana
  let dataCompleta = new Date(ano, mes - 1, dia);
  let diaSemana = dataCompleta.getDay();
  
  // Verifica se é fim de semana
  let fimDeSemana = false;
  if (diaSemana == 0 || diaSemana == 6) {
    fimDeSemana = true;
  }
  
  console.log('É fim de semana?', fimDeSemana); // Mais debug
  
  // Calculando preços - cada um separado 
  
  // Meu Canino Feliz
  let precoCanino = 0;
  if (fimDeSemana == true) {
    // Final de semana: aumenta 20%
    let precoPequenoCanino = 20 * 1.2;
    let precoGrandeCanino = 40 * 1.2;
    precoCanino = (precoPequenoCanino * pequenos) + (precoGrandeCanino * grandes);
  } else {
    // Dia útil
    precoCanino = (20 * pequenos) + (40 * grandes);
  }
  
  // Vai Rex
  let precoRex = 0;
  if (fimDeSemana == true) {
    // Fim de semana tem preços especificos
    precoRex = (20 * pequenos) + (55 * grandes);
  } else {
    // Dia útil
    precoRex = (15 * pequenos) + (50 * grandes);
  }
  
  // ChowChawgas - sempre o mesmo preço
  let precoChow = (30 * pequenos) + (45 * grandes);
  
  console.log('Preços calculados:', precoCanino, precoRex, precoChow); // Debug
  
  // Descobrindo qual é o mais barato
  let melhorNome = '';
  let melhorPreco = 0;
  let melhorDistancia = 0;
  
  // Verifica Meu Canino Feliz primeiro
  melhorNome = 'Meu Canino Feliz';
  melhorPreco = precoCanino;
  melhorDistancia = 2.0;
  
  // Compara com Vai Rex
  if (precoRex < melhorPreco) {
    melhorNome = 'Vai Rex';
    melhorPreco = precoRex;
    melhorDistancia = 1.7;
  } else if (precoRex == melhorPreco) {
    // Se preços iguais, pega o mais próximo
    if (1.7 < melhorDistancia) {
      melhorNome = 'Vai Rex';
      melhorPreco = precoRex;
      melhorDistancia = 1.7;
    }
  }
  
  // Compara com ChowChawgas
  if (precoChow < melhorPreco) {
    melhorNome = 'ChowChawgas';
    melhorPreco = precoChow;
    melhorDistancia = 0.8;
  } else if (precoChow == melhorPreco) {
    // Se preços iguais, pega o mais próximo
    if (0.8 < melhorDistancia) {
      melhorNome = 'ChowChawgas';
      melhorPreco = precoChow;
      melhorDistancia = 0.8;
    }
  }
  
  console.log('Melhor opção:', melhorNome, melhorPreco, melhorDistancia); // Debug
  
  // Responde o frontend
  res.json({
    nome: melhorNome,
    precoTotal: melhorPreco,
    distancia: melhorDistancia
  });
});

 // Inicia o servidor na porta 3001
app.listen(3001, () => {
  console.log('Servidor funcionando na porta 3001');
});