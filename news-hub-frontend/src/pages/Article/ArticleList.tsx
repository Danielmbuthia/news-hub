import { useEffect } from "react";
import ArticleCard from "../../components/Articles/ArticleCard";
import useFetchDataWithScroll from "../../hooks/useFetchDataWithScroll";
import { Article, PaginatedResponse } from "../../types";

const ArticleList = () => {
  const {
    data: articles,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchDataWithScroll({
    endpoint: "/articles",
    queryKey: "articles",
    query: {},
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.pages
          .flatMap((page: PaginatedResponse) => page?.data?.data || [])
          .map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!hasNextPage && articles?.pages?.length > 0 && (
        <div className="text-center text-gray-600 p-4">
          No more articles to load
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="text-center error p-4">
          Error loading articles. Please try again.
        </div>
      )}
    </div>
  );
};

export default ArticleList;
