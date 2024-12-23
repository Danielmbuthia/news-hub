<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsApiService
{
    protected $newsApiBaseUrl = 'https://newsapi.org/v2';
    protected $newsApiKey;

    protected $nytBaseUrl = 'https://api.nytimes.com/svc/topstories/v2';
    protected $nytApiKey;

    public function __construct()
    {
        $this->newsApiKey = config('services.newsapi.key');
        $this->nytApiKey = config('services.nyt.key');
    }

    public function fetchNewsApiArticles($queryParams = [])
    {
        $response = Http::get("{$this->newsApiBaseUrl}/everything", array_merge($queryParams, [
            'apiKey' => $this->newsApiKey,
        ]));

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Error fetching articles from NewsAPI: ' . $response->body());
    }

    public function fetchNytArticles($section = 'home')
    {
        $response = Http::get("{$this->nytBaseUrl}/{$section}.json", [
            'api-key' => $this->nytApiKey,
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Error fetching articles from New York Times: ' . $response->body());
    }
}
