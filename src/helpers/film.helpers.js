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

export function getFilmStats(list){
  let sum = 0;
  let latestYear = 0;
  list.forEach(film => {
    sum += Number(film.rt_score);
    latestYear = Math.max(latestYear, film.release_date);
  });
  return {
    acc_score: sum,
    avg_score: sum / list.length,
    total: list.length,
    latest: latestYear,
  };
};