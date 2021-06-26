import { useEffect, useState } from 'react';
import axios from 'axios'
import { useFormik } from 'formik';

function Home() {
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
      <div className="row">
        <input {...formik.getFieldProps('heroName')}s type="text" placeholder="Busca un heroe" id="heroName" name="heroName" />
        <button onClick={() => setButtonPressed(buttonPressed + 1)} className="btn btn-primary">Search</button>
      </div>
      <div className="row">
        {data ? data.results.map((hero) => (
          <div className="card" style={{ width: "18rem" }}>
            <img src={hero.image.url} className="card-img-top" alt={hero.name} />
            <div className="card-body">
              <h5 className="card-title">{hero.name}</h5>
              <button href="#" className="btn btn-primary">Add to team</button>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default Home;