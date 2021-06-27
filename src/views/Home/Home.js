import { useContext, useEffect, useState } from 'react';
import { useHistory, Link, useRouteMatch, Switch, Route } from 'react-router-dom'
import { TeamContext } from '../../App';
import TeamData from './components/TeamData';

function Home() {
  const value = useContext(TeamContext)
  const history = useHistory()
  const handleRemove = (heroId) => {
    const newTeam = value.context.team.filter(h => h.id !== heroId)
    value.setContext({ ...value.context.team, team: newTeam })
  }
  const handleDetails = (hero) => {
    value.setContext({ ...value.context, selectedHero: hero })
    history.push(`/hero/${hero.id}`)
  }
  return (
    <div className="container-fluid">
      {value.context.team.length ? <TeamData /> : "Go to search to find heroes for your team"}
      <div className="card-group">
        {value.context.team ? value.context.team.map((hero) => (
          <div className="card ms-4 mb-3" style={{ maxWidth: "18rem" }} key={hero.id}>
            <img src={hero.image.url} className="card-img-top" alt={hero.name} />
            <div className="card-body">
              <h5 className="card-title">{hero.name}</h5>
              <ul className="list-group list-group-flush">
                {Object.keys(hero.powerstats).map(stat => (<li class="list-group-item">
                  {`${stat}: ${hero.powerstats[stat]}`}
                </li>))}
              </ul>
            </div>
            <div className="card-footer">
              <button onClick={() => handleDetails(hero)
              } className="btn btn-primary">Details</button>
              <button className="btn btn-danger ms-3" onClick={() => handleRemove(hero.id)}>Remove</button>
            </div>
          </div>
        )) : null}
      </div>
    </div>

  )
}

export default Home;