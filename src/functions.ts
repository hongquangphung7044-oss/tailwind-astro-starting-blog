import type {CollectionEntry} from "astro:content";

/**
 * Filter blog posts by published date and order them.
 * Change the sort order by changing the minus sign to a plus sign, or add your new logic by changing the return value.
 *
 * You have access to the post data, so you can sort by any property you want, ex. by tags or title.
 * The sort order is descending, so the newest posts are first.
 *
 * @param posts Collection of blog posts
 * @returns Collection of blog posts sorted by date
 */
export const sortBlogPosts = (posts: CollectionEntry<'blog'>[] | null): CollectionEntry<'blog'>[] => {
    if (!posts) return [];
    return posts.sort((a, b) => {
        // 1. 先判断置顶状态 (true 转化为 1，没置顶或 false 转化为 0)
        const aSticky = a.data.sticky ? 1 : 0;
        const bSticky = b.data.sticky ? 1 : 0;
        
        // 如果置顶状态不同，置顶的排前面
        if (aSticky !== bSticky) {
            return bSticky - aSticky;
        }
        
        // 2. 如果置顶状态一样（都置顶，或者都没置顶），按时间倒序排列
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
}

/**
 * Exclude draft posts from the collection. If the site is built in production mode, draft posts are excluded by default.
 *
 * @param post Blog post
 * @returns True if the post is not a draft
 */
export const excludeDrafts = ({data}: CollectionEntry<'blog'>): boolean => {
    // Usually this should be like this - import.meta.env.PROD ? !data.draft : true; but for the purpose of the demo, we are displaying drafts as well
    return import.meta.env.PROD ? true : true;
}
