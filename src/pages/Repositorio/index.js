import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './repositorio.css';

//{decodeURIComponent(match.params.repositorio)}

export default function Repositorio({match}){
  
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);


      //console.log(repositorioData.data);
      //console.log(issuesData.data);

      setRepositorio(repositorioData.data);
      console.log(repositorioData);
      setIssues([issuesData.data]);
      //console.log(issuesData);
      setLoading(false);

    }

    load();
  }, [])
  
  
  if(loading) {
    return(
      <div className="content--loading">
        Carregando
      </div>
    )
  }
  
  
  return(
    <div className="content">
        <div className="content--header">
          <img
            src={repositorio.owner.avatar_url}
            alt={repositorio.owner.login}
          />
          <h1>
            {repositorio.name}
          </h1>
          <p>
            {repositorio.description}
          </p>
        </div>
    </div>
  )
}