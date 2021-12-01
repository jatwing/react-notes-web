import { PageItemNode } from 'lib/pages';
import { Ranking } from './slice';

const getRank = (key: string, ranking: Ranking['data']): number => {
  if (!(key in ranking)) {
    return Number.MAX_VALUE;
  }
  return ranking[key];
};

// can not use a common function, url is here.
export const sortPages = (
  pages: Array<PageItemNode>,
  ranking: Ranking['data'],
): Array<PageItemNode> => {
  console.log('## sortPages ##');
  console.log(pages);
  console.log(ranking);
  pages.forEach((page) => {
    console.log(page);
  });

  return pages
    .slice()
    .sort(
      (a: PageItemNode, b: PageItemNode) =>
        getRank(a.url, ranking) - getRank(b.url, ranking),
    );
};

export type Sort = (entities: Array<any>, id: string) => Array<any>;

export const getSortation =
  (rankings: Array<Ranking>, category: string): Sort =>
  (entities: Array<any>, id: string): Array<any> => {
    const ranking = rankings.find(
      (ranking: Ranking) => ranking.id === id && ranking.category === category,
    );
    if (!ranking) {
      throw new Error('unreachable');
    }
    if (category === 'pages') {
      return sortPages(entities, ranking.data);
    }
    throw new Error('unreachable');
  };
