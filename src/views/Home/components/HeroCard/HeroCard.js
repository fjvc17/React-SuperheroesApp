function HeroCard({ heroName, avatar, buttonDisabled, onClick }) {
  return (
    <div className="card ms-4 mb-3" style={{ width: "18rem" }}>
      <img src={avatar} className="card-img-top" alt={heroName} />
      <div className="card-body">
        <h5 className="card-title">{heroName}</h5>
        <button className="btn btn-primary" disabled={buttonDisabled} onClick={onClick}>{buttonDisabled ? "your team is full" : "Add to team"}</button>
      </div>
    </div>)
}

export default HeroCard