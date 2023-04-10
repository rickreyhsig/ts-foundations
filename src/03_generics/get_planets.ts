import got from "got";

type Mass={
  massValue: number,
  massExponent: number
}

type Vol={
  volValue: number,
  volExponent: number
}

type Planet = {
    id: string,
    name: string,
    englishName: string,
    isPlanet: boolean,
    mass: Mass,
    discoveredBy: string
}

interface ResponseData{
  bodies: Planet[]
}

const apiUrl: string = "https://api.le-systeme-solaire.net/rest/bodies/";

// generic function to fetch data
// const getData = async (url:string):Promise<any> => {
//     const data = await got.get(url).json()
//     return data
// }

// generic function to fetch data
const getData = async <D>(url:string):Promise<D> => {
  const data = await got.get(url).json<D>()
  return data
}

// just to check the results in the terminal
// getData(apiUrl).then((planetList) =>
//     console.log(planetList)
// );

getData<ResponseData>(apiUrl).then(data => {
  // fully typed
  data.bodies.filter(function(planet) {
    return planet.isPlanet == true
  }).slice(0,15).map(planet => {
    console.log(planet.englishName + " " + JSON.stringify(planet.mass) + " " + planet.isPlanet + " " + planet.discoveredBy)
  })
})

// our implementation of calculate total mass
const calculateTotalMass = (planetList: Planet[]): number => {
  const totalMass = planetList.reduce(
    (sum: number, plt: Planet): number => {
        if(plt.mass){
            return sum + plt.mass?.massValue * 10 ** plt.mass?.massExponent
        }else{
            return sum
        }
    },
    0
  );

  return totalMass;
};

const mostPlanetDiscoveries = (planetList: Planet[]): string => {
  let discoveries = new Map()
  planetList.map((planet) => {
    if(discoveries.get(planet.discoveredBy)) {
      let num_discoveries = discoveries.get(planet.discoveredBy)
      discoveries.set(planet.discoveredBy, num_discoveries + 1)
    } else {
      discoveries.set(planet.discoveredBy, 1)
    }
  })

  // Sort the map by value in DESC order
  let sortedDiscoveries = new Map([...discoveries.entries()].sort((a, b) => b[1] - a[1]))
  const firstElement = Array.from(sortedDiscoveries)[0]
  return firstElement[0]
}

const getPlanets = (): Promise<Planet[]> => {
  return got
    .get(apiUrl)
    .json<ResponseData>()
    .then((data) => {
      //return data.bodies.slice(0,3);
      return data.bodies;
    });
};

/// just logging the total mass
getPlanets().then((planetList) =>
  console.log(`Total mass: ${calculateTotalMass(planetList)}`)
);

// Log most discoveries
getPlanets().then((planetList) =>
  console.log(`Most discoveries by: ${mostPlanetDiscoveries(planetList)}`)
);