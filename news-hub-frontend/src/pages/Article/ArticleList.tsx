import { useEffect, useState } from "react";
import ArticleCard from "../../components/Articles/ArticleCard";
import useFetchDataWithScroll from "../../hooks/useFetchDataWithScroll";
import { Article, ArticleFilters, PaginatedResponse } from "../../types";

const ArticleList = () => {
  const [filters, setFilters] = useState<ArticleFilters>({
    search: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const {
    data: articles,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchDataWithScroll({
    endpoint: "/articles",
    queryKey: ["articles", filters],
    query: filters,
  });

  // console.log(articles?.pages);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleDateChange =
    (field: "startDate" | "endDate") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [field]: e.target.value });
    };

  return (
    <div className="space-y-4 p-4">
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search articles..."
              value={filters.search}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={filters.startDate}
              onChange={handleDateChange("startDate")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="date"
              value={filters.endDate}
              onChange={handleDateChange("endDate")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

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

      {!hasNextPage && articles?.pages[0]?.data?.length > 0 && (
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
