import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { ArticleCardProps } from "../../types";

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      to={`/articles/${article?.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={article?.image_url}
          alt={article?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {article?.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-red-600 transition-colors duration-200">
          {article?.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{article?.content}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {formatDistanceToNow(new Date(article?.published_at))} ago
          </span>
          {/* <span>{article?.read_time} read</span> */}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
