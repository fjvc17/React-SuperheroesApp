import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik';
import HeroCard from './components/HeroCard';
import { TeamContext } from '../../App';

function Home() {
  const history = useHistory();
  const value = useContext(TeamContext)
  const handleRemove = (heroId) => {
    const newTeam = value.team.filter(h => h.id !== heroId)
    value.setTeam(newTeam)
  }
  return (
    <div className="container-fluid">
      <div className="card-group">
        {value.team ? value.team.map((hero) => (
          <div className="card ms-4 mb-3" style={{ maxWidth: "18rem" }} key={hero.id}>
            <img src={hero.image.url} className="card-img-top" alt={hero.name} />
            <div className="card-body">
              <h5 className="card-title">{hero.name}</h5>
              <ul class="list-group list-group-flush">
                {Object.keys(hero.powerstats).map(stat => (<li class="list-group-item">
                  {`${stat}: ${hero.powerstats[stat]}`}
                </li>))}
              </ul>
            </div>
            <div className="card-footer">
              <button href="#" className="btn btn-primary">Details</button>
              <button className="btn btn-danger ms-3" onClick={() => handleRemove(hero.id)}>Remove</button>
            </div>
          </div>

          // <HeroCard cardClick={() => { history.push() }} powerStats={hero.powerstats} heroName={hero.name} avatar={hero.image.url} />
        )) : null}
      </div>
    </div>

  )
}

export default Home;