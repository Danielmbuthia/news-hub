<?php

namespace App\Console\Commands;

use App\Http\Controllers\ScrapeNewsController;
use Illuminate\Console\Command;

class ScrapeNewsArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape news from API and save to database';

    /**
     * Execute the console command.
     */

    protected $newsController;

    public function __construct(ScrapeNewsController $newsController)
    {
        parent::__construct();
        $this->newsController = $newsController;
    }
    public function handle()
    {
        $this->newsController->fetchAndStoreArticles();
        $this->info('News articles scraped and stored successfully!');
    }
}
