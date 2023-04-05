interface Rocket{
  name: string
  payload_capacity: number
  manufacturer: Manufacturer
  payload: Array<Payload>
}

enum Manufacturer{
  SPACE_X,
  SOYUZ,
  BOEING,
  AIRBUS
}

interface PassengerRocket extends Rocket{
  passengers_capacity: number
}

interface RocketLaunch{
  rocket: Rocket
  date: number
  name?: string // name is an optional parameter
  hasPassengers: boolean
}

// using a type alias for the function
type CreateRocketLaunch = (rocket: Rocket, name?: string) => RocketLaunch

//export default function createRocketLaunch(rocket: Rocket, name?: string): RocketLaunch{
const createRocketLaunch: CreateRocketLaunch = (rocket, name) => {
  const date = new Date().getTime()

  // check if any of the payloads is of type Human
  const hasPassengers = rocket.payload.some(payloadItem => isHuman(payloadItem))
  return {
    rocket,
    date,
    name,
    hasPassengers
  }
}

const ariane:Rocket = {
  name: "Ariane 5",
  payload_capacity: 10000,
  manufacturer: Manufacturer.AIRBUS,
  payload: []
}

const kayla:Human = {
  name: "Kayla Barron",
  age: 34,
  weight: 58
}

const dragon:PassengerRocket = {
  name: "Dragon",
  payload_capacity: 300,
  manufacturer: Manufacturer.SPACE_X,
  passengers_capacity: 3,
  payload: [kayla]
}

type Human = {
  name: string,
  age: number,
  weight: number,
}

type Satellite = {
  name: string,
  weight: number,
  type: string // feel free to make this an enum
}

type Payload = Human|Satellite

function isHuman(rocketPayload: Payload): rocketPayload is Human {
  return (rocketPayload as Human).age !== undefined;
}

const arianeLaunch = createRocketLaunch(ariane, "Ariane launch")
const dragonLaunch = createRocketLaunch(dragon)
const nameDragonLaunch = createRocketLaunch(dragon, "the second try")

console.log(arianeLaunch)
console.log(dragonLaunch)
console.log(JSON.stringify(nameDragonLaunch))
console.table(nameDragonLaunch)
console.table(JSON.stringify(nameDragonLaunch))