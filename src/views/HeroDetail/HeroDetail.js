import { TeamContext } from "../../App"
import { useContext } from 'react'

function HeroInfo({ name, value }) {
  return <li className="list-group-item">
    {`${name}: ${value}`}
  </li>
}
function HeroDetail() {
  const { context: { selectedHero: hero } } = useContext(TeamContext)
  return (<div className="card ms-4 mb-3" style={{ width: "18rem" }}>
    <img src={hero.image.url} className="card-img-top" alt={hero.name} />
    <div className="card-body">
      <h5 className="card-title">{hero.name}</h5>
      <ul className="list-group list-group-flush">
        <HeroInfo name="weight" value={hero.appearance.weight[1]} />
        <HeroInfo name="heigth" value={hero.appearance.height[1]} />
        <HeroInfo name="name" value={hero.name} />
        <HeroInfo name="alias" value={hero.biography.aliases.join(", ")} />
        <HeroInfo name="eye color" value={hero.appearance["eye-color"]} />
        <HeroInfo name="hair color" value={hero.appearance["hair-color"]} />
        <HeroInfo name="workplace" value={hero.work.base} />
      </ul >
    </div >
  </div >)
}

export default HeroDetail

//
// ● Peso.
// ● Altura.
// ● Nombre.
// ● Alias.
// ● Color de ojos.
// ● Color de cabello.
// ● Lugar de trabajo.