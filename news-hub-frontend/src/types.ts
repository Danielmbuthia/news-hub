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