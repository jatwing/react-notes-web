import { PageItemNode } from 'lib/pages';
import { Ranking, Category } from './slice';

const getRank = (
  criterion: string,
  ranking: Record<string, number>,
): number => {
  if (!(criterion in ranking)) {
    return Number.MAX_VALUE;
  }
  return ranking[criterion];
};

const getCriterion = (entity: any, category: Category): string => {
  switch (category) {
    case 'columns': {
      return entity;
    }
    case 'pages':
      return (entity as PageItemNode).url;
    default:
      throw new Error('unreachable');
  }
};

export type Sort = <T>(entities: Array<T>, id: string) => Array<T>;

export const getSortation =
  (rankings: Array<Ranking>, category: Category): Sort =>
  <T>(entities: Array<T>, id: string): Array<T> => {
    const ranking = rankings.find(
      (ranking: Ranking) => ranking.id === id && ranking.category === category,
    );
    if (!ranking) {
      return entities;
    }
    return entities
      .slice()
      .sort(
        (a: T, b: T) =>
          getRank(getCriterion(a, category), ranking.data) -
          getRank(getCriterion(b, category), ranking.data),
      );
  };
