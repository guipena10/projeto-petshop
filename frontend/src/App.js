import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // Estados para guardar os valores dos inputs
  const [data, setData] = useState('');
  const [pequenos, setPequenos] = useState('');
  const [grandes, setGrandes] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  
  // Função para rodar quando clicar no botão
  async function calcular(event) {
    event.preventDefault(); // Impede a página recarregar
    
    // Limpar os erros anteriores
    setErro('');
    
    // Necessario preencher tudo para funcionar
    if (data == '' || pequenos == '' || grandes == '') {
      setErro('Precisa preencher tudo!');
      return;
    }
    
    setCarregando(true);
    
    try {
      // Chama o backend
      let resposta = await axios.post('http://localhost:3001/calcular', {
        data: data,
        pequenos: pequenos,
        grandes: grandes
      });
      
      console.log('Resposta do servidor:', resposta.data); // Debug
      
      setResultado(resposta.data);
      
    } catch (error) {
      console.log('Deu erro:', error); // Debug
      setErro('Algo deu errado, tenta de novo');
    }
    
    // Para de mostrar carregando
    setCarregando(false);
  }
  
  return (
    <div style={{padding: 20, fontFamily: 'Arial', maxWidth: 600, margin: 'auto'}}>
      <h1 style={{textAlign: 'center', color: '#333'}}>Calculadora de Petshop</h1>
      
      {/* Formulário */}
      <form onSubmit={calcular}>
        <div style={{marginBottom: 10}}>
          <label style={{display: 'block', fontWeight: 'bold'}}>Data (DD/MM/AAAA):</label>
          <input 
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Ex: 03/08/2024"
            style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}}
          />
        </div>
        
        <div style={{marginBottom: 10}}>
          <label style={{display: 'block', fontWeight: 'bold'}}>Cães pequenos:</label>
          <input 
            type="number"
            value={pequenos}
            onChange={(e) => setPequenos(e.target.value)}
            style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}}
          />
        </div>
        
        <div style={{marginBottom: 10}}>
          <label style={{display: 'block', fontWeight: 'bold'}}>Cães grandes:</label>
          <input 
            type="number"
            value={grandes}
            onChange={(e) => setGrandes(e.target.value)}
            style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            width: '100%', 
            padding: 12, 
            backgroundColor: carregando ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            cursor: carregando ? 'not-allowed' : 'pointer'
          }}
          disabled={carregando}
        >
          {carregando ? 'Calculando...' : 'Calcular'}
        </button>
      </form>
      
      {/* Mostra erro se tiver */}
      {erro != '' && (
        <div style={{color: 'red', marginTop: 10, padding: 10, backgroundColor: '#ffebee'}}>
          {erro}
        </div>
      )}
      
      {/* Mostra resultado se tiver */}
      {resultado && (
        <div style={{marginTop: 20, padding: 15, backgroundColor: '#e8f5e8', border: '1px solid #4caf50', borderRadius: 4}}>
          <h3 style={{color: '#2e7d32', marginTop: 0}}>Resultado:</h3>
          <p><strong>Melhor petshop:</strong> {resultado.nome}</p>
          <p><strong>Preço total:</strong> R$ {resultado.precoTotal.toFixed(2)}</p>
          <p><strong>Distância:</strong> {resultado.distancia} km</p>
        </div>
      )}
    </div>
  );
}

export default App;