export function filterFilmsByDirector(list, director) {
  if (director) return list.filter((film) => film.director == director);
  else return list;
}

export function getListOf(list, prop) {
  const resultArray = [];
  for (const element of list) {
    const value = element[prop];
    if(!resultArray.includes(value)){
      resultArray.push(value);
    }
  }

  return resultArray;

  // return [...new Set(list.map((film) => film[prop] || ""))];
}
