import { PageItemNode } from 'lib/pages';
import { Ranking } from './slice';

export const sortPages = (
  pages: Array<PageItemNode>,
  ranking: Ranking['data'],
): Array<PageItemNode> => {
  return pages
    .slice()
    .sort(
      (a: PageItemNode, b: PageItemNode) => ranking[a.url] - ranking[b.url],
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
