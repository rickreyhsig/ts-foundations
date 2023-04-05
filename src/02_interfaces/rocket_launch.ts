/*
primitive types
interfaces
type aliases
union types
typing a function
using a type guard
type inference
*/
interface Rocket{
  name: string
  payload_capacity: number
  manufacturer: Manufacturer
  payload: Array<Payload>
  launchDirection: CardinalDirection
}

enum Manufacturer{
  SPACE_X = 'SPACE_X',
  SOYUZ = 'SOYUZ',
  BOEING = 'BOEING',
  AIRBUS = 'AIRBUS'
}

enum CardinalDirection {
  North = 'North',
  East = "East",
  South = "South",
  West = "West"
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

  // Checking my new type guard
  if (rocket.payload.some(payloadItem => isSatellite(payloadItem))) {
    console.log(`${JSON.stringify(rocket)} payload is SATELLITE`)
  }
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
  payload: [],
  launchDirection: CardinalDirection.East
}

const kayla:Human = {
  name: "Kayla Barron",
  age: 34,
  weight: 58
}

const ricardoSatellite:Satellite = {
  name: "A terrific sattelite",
  weight: 180,
  type: 'steel'
}

const dragon:PassengerRocket = {
  name: "Dragon",
  payload_capacity: 300,
  manufacturer: Manufacturer.SPACE_X,
  passengers_capacity: 3,
  payload: [kayla],
  launchDirection: CardinalDirection.North
}

const ricardoDragon:PassengerRocket = {
  name: "ricardoDragon",
  payload_capacity: 307,
  manufacturer: Manufacturer.BOEING,
  passengers_capacity: 7,
  payload: [ricardoSatellite],
  launchDirection: CardinalDirection.South
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

// type guards
function isHuman(rocketPayload: Payload): rocketPayload is Human {
  return (rocketPayload as Human).age !== undefined;
}

function isSatellite(rocketPayload: Payload): rocketPayload is Satellite {
  return (rocketPayload as Satellite).type !== undefined;
}

const arianeLaunch = createRocketLaunch(ariane, "Ariane launch")
const dragonLaunch = createRocketLaunch(dragon)
const nameDragonLaunch = createRocketLaunch(dragon, "the second try")
const ricardoDragonLaunch = createRocketLaunch(ricardoDragon, "Ricardo's try")

console.log(arianeLaunch)
console.log(dragonLaunch)
console.log(JSON.stringify(nameDragonLaunch))
console.table(nameDragonLaunch)
console.table(JSON.stringify(nameDragonLaunch))
console.table(ricardoDragonLaunch)
console.dir(JSON.stringify(ricardoDragonLaunch))
