function HeroCard({ heroName, avatar, powerStats, onClick, showStats }) {
  return (
    <div className="card ms-4 mb-3" style={{ width: "18rem" }}>
      <img src={avatar} className="card-img-top" alt={heroName} />
      <div className="card-body">
        <h5 className="card-title">{heroName}</h5>
        <button href="#" className="btn btn-primary" onClick={onClick}>Add to team</button>
      </div>
    </div>)
}

export default HeroCard