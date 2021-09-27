export const getRankingSort = (entities) => {
  const sort = (unrankedArray, rankingsId, criterialProperty = null) => {
    if (!entities || !(rankingsId in entities)) {
      return unrankedArray;
    }
    const getRanking = (element) => {
      const criterion = criterialProperty
        ? element[criterialProperty]
        : element;
      if (!criterion || !(criterion in entities[rankingsId])) {
        return Number.MAX_VALUE;
      }
      const ranking = entities[rankingsId][criterion];
      if (isNaN(ranking)) {
        return Number.MAX_VALUE;
      }
      return ranking;
    };
    unrankedArray.sort((a, b) => getRanking(a) - getRanking(b));
  };
  return sort;
}

