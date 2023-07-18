import { useState } from 'react';
import './style.css';
import { FiSearch } from 'react-icons/fi';

import { apiConta, apiTransferencia } from './services/api';
import moment from 'moment/moment';


function App() {
  const [datainicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [operador, setOperador] = useState('');
  const [extrato, setExtrato] = useState([]);


  const convertDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY');
  };


  async function handleSearch() {

   

    if (operador !== '' || (datainicio !== '' && dataFim !== '')) {
      // Realizar a busca
      try {
        let response;
        
        if (operador !== '') {
          // Busca pelo nome do operador
          response = await apiConta.get(`nome/${operador}/transferencias`);
        } else {
          // Busca por data de início e data de fim
        
          response = await apiTransferencia.get(`/?dataInicial=${datainicio}&dataFinal=${dataFim}`);
        }
        
        setExtrato(response.data);
        setOperador('');
        setDataInicio('');
        setDataFim('');
      } catch (error) {
        alert('Erro ao buscar: ' + error.message);
        setOperador('');
        setDataInicio('');
        setDataFim('');
      }
    } else {
      alert('Preencha o nome do Operador ou a Data de Início e a Data de Fim');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Extrato Bancario</h1>

      <div className="containerInput">
        <input
          type="text"
          name="datainico"
          placeholder="Data de inicio"
          value={datainicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <input
          type="text"
          name="datafim"
          placeholder="Data de Fim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
        <input
          type="text"
          name="nome do operador"
          placeholder="Nome do Operador"
          value={operador}
          onChange={(e) => setOperador(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
          PESQUISAR
        </button>
      </div>

      <table className="transaction-list">
        <thead>
          <tr>
            <th>Data da Transferência</th>
            <th>Valor</th>
            <th>Tipo de Operação</th>
            <th>Nome do Operador da Transação</th>
          </tr>
        </thead>
        <tbody>
          {extrato.map((get, key) => (
            <tr className="transaction" key={key}>
              <td>{convertDate(get.dataTransferencia.toString())}</td>
              <td>{get.valor}</td>
              <td>{get.tipo}</td>
              <td>{get.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;



