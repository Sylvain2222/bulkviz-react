import { useState, useEffect, onChange } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

// ACTIVER PLUGIN CORS
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

  const [data, setData] = useState(null) // Hook use to have local state without declaring class

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


  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://127.0.0.1:5173';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }

  return (
    <>
    <h className="WiP">Work In Progress</h>

    <div >
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>

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

    </>
  )
}

export default App
