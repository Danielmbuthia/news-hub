<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Article::query();


        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }


        if ($request->filled('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        if ($request->filled('startDate') && $request->startDate !== '') {
            $query->whereDate('published_at', '>=', $request->startDate);
        }

        if ($request->filled('endDate') && $request->endDate !== '') {
            $query->whereDate('published_at', '<=', $request->endDate);
        }

        $query->latest('published_at');

        $articles = $query->paginate($request->get('per_page', 10));

        return response()->json(['data' => $articles, 'message' => 'Articles fetched successfully'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return response()->json(['data' => $article, 'message' => 'Article fetched successfully'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
