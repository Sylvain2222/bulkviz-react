import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// ACTIVER PLUG IN CORS
// npm run dev

function App() {
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/bulk');
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);

    };
    fetchData();
  }, [])

  const [data, setData] = useState(null)

  function onClickCard(card) {
    let stringToDisplay = '';
    console.log(card);
    switch(card.name)
    {
      case 'CQUAD4':
      case 'CTRIA3':
      case 'CBEAM':
      case 'CBAR': 
        stringToDisplay = `${card.name} ${card.id} ${card.property} ${card.grids} ${card.orientation}`;
        break;
      case 'PSHELL':
      case 'PBEAM': 
      case 'PBAR': 
      case 'PCOMP': 
        stringToDisplay = `${card.name} ${card.id} ${card.material} ${card.data}`;
        break;
      case 'MAT1': 
      case 'MAT8': 
        stringToDisplay = `${card.name} ${card.id} ${card.data}`;
        break;
    }
    alert(stringToDisplay);
  }

  return (
    <>
    <h className="WiP">Work In Progress</h>
    <h1 className="title">List of cards in the bulk:</h1>
      <table className="card_table">
        <tr className="card_table">
          <th >Card</th>
          <th >Number</th>
        </tr>
      {data && Object.keys(data).map((key, index) => {
        return <tr className="data-row" key={index} onClick={() => onClickCard(data[key][0])}>
          <td className="cards">{key}</td>
          <td className="numbers">{data[key].length}</td>
        </tr>
      })}
      </table>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
