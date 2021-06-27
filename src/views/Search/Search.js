import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useFormik } from 'formik';

import { TeamContext } from '../../App';
import HeroCard from '../Home/components/HeroCard';

const REQUEST_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  REJECTED: "rejected",
  RESOLVED: "resolved",
}

function Search() {
  const value = useContext(TeamContext)
  const [data, setData] = useState(null)
  const [requestState, setRequestState] = useState(REQUEST_STATES.IDLE)
  const [buttonPressed, setButtonPressed] = useState(0)
  const formik = useFormik({
    initialValues: {
      heroName: ''
    }
  })
  useEffect(() => {
    async function getData() {
      if (formik.values.heroName) {
        setRequestState(REQUEST_STATES.LOADING)
        const { data } = await axios.get(`https://superheroapi.com/api/10226504347219088/search/${formik.values.heroName}`)
        setData(data)
        setRequestState(REQUEST_STATES.RESOLVED)
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
        {requestState === REQUEST_STATES.RESOLVED ? data.results ? data.results.map((hero) => (
          <HeroCard buttonDisabled={value.context.team.length === 6} key={hero.id} powerStats={hero.powerstats} showStats onClick={() => value.setContext({ ...value.context, team: value.context.team.concat(hero) })} heroName={hero.name} avatar={hero.image.url} />
        )) : <div>No hero found</div> : null}
      </div>
    </div>
  )
}

export default Search;