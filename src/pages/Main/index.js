import React , { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaBars } from 'react-icons/fa';
import './main.css';

import api from '../../pages/services/api';

export default function Main(){
  
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }
  
  
  const handleSubmit = useCallback((e) => {
      e.preventDefault();
      //console.log(newRepo);
      async function submit() {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        }

        setRepositorios([...repositorios, data]);
        //console.log(repositorios);
        setNewRepo('');
      }

    
      submit();
  }, [newRepo, repositorios]);        


  return(
    <div className="container">
      <h1>
        <FaGithub size={25}/>
        Meus repositórios
      </h1>
      
      <form onSubmit={handleSubmit}>
        
        <input 
          type="text" 
          placeholder="Adcionar repositório"
          value={newRepo}
          onChange={handleInputChange}/>
        
        <button type="submit" className="submitButton">
          <FaPlus color="#fff" size={14} />
        </button>
      </form>

      <ul>
        {repositorios.map((repo, key) => (
          <li key={key}>
            <span>{repo.name}</span>
            <a href="/">
              <FaBars size={20}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}