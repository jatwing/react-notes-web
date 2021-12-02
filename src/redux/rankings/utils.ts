import { PageItemNode } from 'lib/pages';
import { Ranking } from './slice';

const getRank = (name: string, ranking: Ranking['data']): number => {
  if (!(name in ranking)) {
    return Number.MAX_VALUE;
  }
  return ranking[name];
};

const getName = (entity: any, category: string): string => {
  switch (category) {
    case 'pages':
      return (entity as PageItemNode).url;
    default:
      throw new Error('unreachable');
  }
};

export type Sort = <T>(entities: Array<T>, id: string) => Array<T>;

export const getSortation =
  (rankings: Array<Ranking>, category: string): Sort =>
  <T>(entities: Array<T>, id: string): Array<T> => {
    const ranking = rankings.find(
      (ranking: Ranking) => ranking.id === id && ranking.category === category,
    );
    if (!ranking) {
      throw new Error('unreachable');
    }
    return entities
      .slice()
      .sort(
        (a: T, b: T) =>
          getRank(getName(a, category), ranking.data) -
          getRank(getName(b, category), ranking.data),
      );
  };
