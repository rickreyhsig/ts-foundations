/* 
Human-friendly and powerful HTTP request library for Node.js
https://github.com/sindresorhus/got#readme
*/
import got from "got";


type Planet = {
    id: string,
    englishName: string
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










/*
type Mass = {
  massVal: number,
  massExponent: number
}

type Planet = {
  id: string,
  englishName: string, 
  mass: Mass
}

interface ResponseData{
  bodies: Planet[]
}

const apiUrl: string = "https://api.le-systeme-solaire.net/rest/bodies/";

// generic function to fetch data
// const getData = async (url:string):Promise<any> => {
//   const data = await got.get(url).json()
//   return data
// }

const getData = async <D>(url:string):Promise<D> => {
  const data = await got.get(url).json<D>()
  return data
}

// just to check the results in the terminal

// getData(apiUrl).then((planetList) =>
//   console.log(planetList.bodies.slice(0,2))
// );


getData<ResponseData>(apiUrl).then((planetList) =>
  planetList.bodies.slice(0,5).map(planet => {
    console.log(planet.englishName)
  })
);

// our implementation of calculate total mass
const calculateTotalMass = (planetList: Planet[]): number => {
  const totalMass = planetList.reduce(
    (sum: number, plt: Planet): number => {
        if(plt.mass){
            return sum + plt.mass?.massVal * 10 ** plt.mass?.massExponent
        }else{
            return sum
        }
    },
    0
  );

  return totalMass;
};

const getPlanets = (): Promise<Planet[]> => {
  return got
    .get(apiUrl)
    .json<ResponseData>()
    .then((planets) => {
      return planets.bodies.slice(0,5)
    });
}


getData<ResponseData>(apiUrl).then((planetList) =>
  planetList.bodies.slice(0,5).map(planet => {
    console.log(planet.englishName)
  })
);

// Log the total mass
getData(apiUrl).then((planetList) =>
  console.log(calculateTotalMass(planetList))
)
*/

/*

type Planet = {
  id: string,
  englishName: string,
  mass: Mass
}

interface ResponseData{
  bodies: Planet[]
}

type Mass={
  massValue: number,
  massExponent: number
}

const apiUrl: string = "https://api.le-systeme-solaire.net/rest/bodies/";

// generic function to fetch planetList
const getPlanetList = async <JSON>(url:string):Promise<JSON> => {
  const planetList = await got.get(url).json<JSON>()
  return planetList
}

getPlanetList<ResponseData>(apiUrl).then((planetList) => {
    planetList.bodies.slice(0,4).map(planet => {
      console.log(planet.englishName + ': ' + JSON.stringify(planet.mass))
    })
  }
);

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

const getPlanets = (): Promise<Planet[]> => {
  return got
    .get(apiUrl)
    .json<ResponseData>()
    .then((planetList) => {
      return planetList.bodies;
    });
};


// generic function to fetch data
const getData = async <D>(url:string):Promise<D> => {
  const data = await got.get(url).json<D>()
  return data
}

// generic function to fetch data
getData<ResponseData>(apiUrl).then(data => {
  // fully typed
  data.bodies.slice(0,1).map(planet => {
      console.log(planet.englishName)
  })
})
/// just logging the total mass
getPlanetList(apiUrl).then((data) =>
  console.log(`Total mass: ${calculateTotalMass(data)}`)
);

*/

