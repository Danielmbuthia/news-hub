import ArticleCard from "../../components/Articles/ArticleCard";
import useFetchData from "../../hooks/useFetchData";
import { Article } from "../../types";

const Feed = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useFetchData("/feed/personalized", ["feed"]);

  console.log(articles?.data);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center error p-4">
        Error loading personalized feed. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Your Personalized Feed
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.data?.data?.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
