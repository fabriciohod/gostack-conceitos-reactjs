import React, { useState } from "react";
import api from './services/api';
import "./styles.css";
import { useEffect } from 'react';

function App()
{

  const [repositoryList, setRepositoryList] = useState([]);

  async function handleAddRepository()
  {
    const repoToAdd = {
      title: Date.now().toString(),
      url: "http",
      techs: ["1", "2", "3"]
    };
    await api.post('repositories', repoToAdd)
      .then(req =>
      {
        const newRepo = req.data;
        setRepositoryList([...repositoryList, newRepo]);
      });
  }

  async function handleRemoveRepository(id)
  {
    await api.delete(`repositories/${id}`);
  }

  useEffect(() =>
  {
    api.get('repositories')
      .then(req =>
      {
        const repos = req.data;
        setRepositoryList([...repos]);
      });
  }, [repositoryList]);

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositoryList.map(repo =>
          {
            return (
              <li key={repo.id}>
                {repo.title}

                <button button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            );
          })
        }
      </ul>
      <button onClick={_ => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
