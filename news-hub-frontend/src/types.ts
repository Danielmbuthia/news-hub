export interface userProps {
    readonly id: string;
    first_name: string;
    last_name: string;
    email:string;
    email_verified_at?: Date;
  }

 export interface Article {
    readonly id: number;
    title: string;
    content: string;
    image_url: string;
    category: string;
    read_time: string;
    published_at: string;
  }

  export interface ArtcileResponse {
    data: Article;
  }
  
 export interface ArticleCardProps {
    article: Article;
  }

  export interface QueryParams {
    [key: string]: any;
  }


  export interface PaginatedResponse {
    data: {
      data: Article[];
      current_page: number;
      total: number;
    };
  }


  export interface ArticleFilters {
    search: string;
    category: string;
    startDate: string;
    endDate: string;
  }

  export interface FetchDataParams {
    endpoint: string;
    queryKey: (string | QueryParams)[];
    query: QueryParams;
  }

  export interface UserPreference {
    categories: string[];
    sources: string[];
    authors: string[];
  }
  
