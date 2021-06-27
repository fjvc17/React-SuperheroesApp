import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useFormik } from 'formik';

import { TeamContext } from '../../App';
import HeroCard from '../Home/components/HeroCard';

function Search() {
  const value = useContext(TeamContext)
  const [data, setData] = useState(null)
  const [buttonPressed, setButtonPressed] = useState(0)
  const formik = useFormik({
    initialValues: {
      heroName: ''
    }
  })
  useEffect(() => {
    async function getData() {
      if (formik.values.heroName) {
        const { data } = await axios.get(`http://localhost:8000/search?q=${formik.values.heroName}`)
        setData(data)
      }
    }
    getData()
  }, [formik.touched.heroName, buttonPressed])
  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <input {...formik.getFieldProps('heroName')} className={"col-4 ms-3"} type="text" placeholder="Busca un heroe" id="heroName" name="heroName" />
        <button onClick={() => setButtonPressed(buttonPressed + 1)} className="btn btn-primary col-1 ms-3">Search</button>
      </div>
      <div className="row ms-4">
        {data ? data.results.map((hero) => (
          <HeroCard key={hero.id} powerStats={hero.powerstats} showStats onClick={() => value.setTeam(value.team.concat(hero))} heroName={hero.name} avatar={hero.image.url} />
        )) : null}
      </div>
    </div>
  )
}

export default Search;