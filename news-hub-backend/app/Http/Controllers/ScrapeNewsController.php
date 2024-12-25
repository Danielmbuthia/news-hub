<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\NewsApiService;
use Illuminate\Http\Request;

class ScrapeNewsController extends Controller
{
    protected $newsService;
    public function __construct(NewsApiService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function fetchAndStoreArticles()
    {

        $newsApiData = $this->newsService->fetchNewsApiArticles(['q' => 'technology', 'language' => 'en']);

        foreach ($newsApiData['articles'] as $article) {
            Article::updateOrCreate(
                ['url' => $article['url']],
                [
                    'title' => $article['title'],
                    'content' => $article['content'] ?? '',
                    'author' => $article['author'] ?? 'Unknown',
                    'source' => $article['source']['name'],
                    'category' => 'Technology',
                    'published_at' => $article['publishedAt'],
                    'image_url' => $article['urlToImage'] ?? '',
                ]
            );
        }


        $nytData = $this->newsService->fetchNytArticles('technology');

        foreach ($nytData['results'] as $article) {
            Article::updateOrCreate(
                ['url' => $article['url']],
                [
                    'title' => $article['title'],
                    'content' => $article['abstract'] ?? '',
                    'author' => $article['byline'] ?? 'Unknown',
                    'source' => 'New York Times',
                    'category' => 'Technology',
                    'published_at' => $article['published_date'],
                    'image_url' => $article['multimedia'][0]['url'] ?? ''
                ]
            );
        }

        $guadianData = $this->newsService->fetchGuardianArticles();

        foreach ($guadianData['results'] as $article) {
            Article::updateOrCreate(
                ['url' => $article['webUrl']],
                [
                    'title' => $article['webTitle'],
                    'content' => $article['webTitle'] ?? '',
                    'author' => $article['sectionName'] ?? 'Unknown',
                    'source' => 'The Guardian',
                    'category' => $article['pillarName'],
                    'published_at' => $article['webPublicationDate'],
                    'image_url' => ''
                ]
            );
        }

        return response()->json(['message' => 'Articles fetched and stored successfully.']);
    }
}
