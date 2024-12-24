import { format } from "date-fns";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { ArtcileResponse as ArticleType } from "../../types";

const Article = () => {
  const { id } = useParams();
  const {
    data: article,
    isLoading,
    error,
  } = useFetchData<ArticleType>(`/articles/${id}`, ["article", id]);

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

  if (!article?.data) {
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
          {article?.data.category}
        </span>
        <time dateTime={article?.data.published_at}>
          {format(new Date(article?.data.published_at), "MMMM d, yyyy")}
        </time>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        {article?.data.title}
      </h1>

      {article?.data.image_url && (
        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
          <img
            src={article?.data.image_url}
            alt={article?.data.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div
        className="max-w-none"
        dangerouslySetInnerHTML={{ __html: article?.data.content }}
      />
    </article>
  );
};

export default Article;
