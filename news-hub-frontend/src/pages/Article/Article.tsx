import { format } from "date-fns";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Article as ArticleType } from "../../types";

const Article = () => {
  const { id } = useParams();
  const {
    data: article,
    isLoading,
    error,
  } = useFetchData<ArticleType>(`/articles/${id}`, ["article"]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="error">Error loading article. Please try again.</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Article not found</div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {article.category}
        </span>
        <time dateTime={article.published_at}>
          {format(new Date(article.published_at), "MMMM d, yyyy")}
        </time>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>

      {article.image_url && (
        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div
        className="max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default Article;
