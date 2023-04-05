import got from "got";

type Planet = {
  id: string,
  englishName: string
}

const apiUrl: string = "https://api.le-systeme-solaire.net/rest/bodies/";

// generic function to fetch data
const getData = async (url:string):Promise<any> => {
  const data = await got.get(url).json()
  return data
}

// just to check the results in the terminal
getData(apiUrl).then((planetList) =>
  console.log(planetList)
);
