import { useContext } from "react"
import { TeamContext } from "../../../../App"

const getAverage = (values) => {
  const sum = getSum(values)
  return Math.round(sum / values.length)
}

const getSum = (values) => values.reduce((prev, curr) => {
  if (!Number(curr)) {
    return prev
  }
  return prev += Number(curr)
}, 0)

const getMainPowerStat = (stats) => stats.sort((a, b) => b - a)[0]

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getTeamData(team) {
  const intelligence = getSum(team.map(h => h.powerstats.intelligence))
  const strength = getSum(team.map(h => h.powerstats.strength))
  const speed = getSum(team.map(h => h.powerstats.speed))
  const durability = getSum(team.map(h => h.powerstats.durability))
  const power = getSum(team.map(h => h.powerstats.power))
  const combat = getSum(team.map(h => h.powerstats.combat))
  const weight = getAverage(team.map(h => h.appearance.weight[1].split(" ")[0]))
  const heigth = getAverage(team.map(h => h.appearance.height[1].split(" ")[0]))

  return {
    weight,
    heigth,
    intelligence,
    strength,
    speed,
    durability,
    power,
    combat
  }
}

function TeamData() {
  const value = useContext(TeamContext)
  const { weight,
    heigth,
    ...powerStats
  } = getTeamData(value.context.team);
  const mainPowerStatValue = getMainPowerStat(Object.values(powerStats))
  const mainStat = getKeyByValue(powerStats, mainPowerStatValue).toUpperCase()
  return (<div className={"row mb-3"}>
    <div className="col-3">
      {`The main stat is ${mainStat}`}
    </div>
    <div className="col-3">
      <ul className="list-group">
        <li className="list-group-item">Average weight: {weight} kg</li>
        <li className="list-group-item">Average heigth: {heigth} cm</li>
      </ul>
    </div>
    <div className="col-3 offset-1">

      <ul className="list-group">
        {Object.keys(powerStats).map(a => <li className="list-group-item">{`Total ${a}: ${powerStats[a]}`}</li>)}
      </ul>
    </div>
  </div>)
}

export default TeamData