import { PageItemNode } from 'lib/pages';
import { Ranking } from './slice';

export const sortPages = (
  pages: Array<PageItemNode>,
  ranking: Ranking['ranking'],
): Array<PageItemNode> => {
  return pages
    .slice()
    .sort(
      (a: PageItemNode, b: PageItemNode) => ranking[a.url] - ranking[b.url],
    );
};

export type Sort = (entities: Array<any>, id: string, category: string) => Array<any> 

export const getSortation =
  (rankings: Array<Ranking>): Sort =>
  (entities: Array<any>, id: string, category: string): Array<any> => {
    const result = rankings.find(
      (ranking: Ranking) => ranking.id === id && ranking.category === category,
    );
    if (!result) {
      throw new Error('unreachable');
    }
    if (category === 'pages') {
      return sortPages(entities, result.ranking);
    }
    throw new Error('unreachable');
  };
