<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preferences = Preference::where('user_id', Auth::id())->first();
        return response()->json([
            'data' => $preferences,
            'message' => 'User preferences fetched successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Preference $preference)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Preference $preference)
    {
        $request->validate([
            'categories' => 'array',
            'categories.*' => 'string',
            'sources' => 'array',
            'sources.*' => 'string',
            'authors' => 'array',
            'authors.*' => 'string',
        ]);

        $preferences = Preference::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'categories' => $request->categories,
                'sources' => $request->sources,
                'authors' => $request->authors,
            ]
        );

        return response()->json([
            'data' => $preferences,
            'message' => 'Preferences updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Preference $preference)
    {
        //
    }
    public function getPersonalizedFeed(Request $request)
    {
        $preferences = Preference::where('user_id', Auth::id())->first();

        if (!$preferences) {
            return response()->json([
                'message' => 'No preferences set'
            ]);
        }

        $query = Article::query();

        if (!empty($preferences->categories)) {
            $query->whereIn('category', $preferences->categories);
        }

        if (!empty($preferences->sources)) {
            $query->whereIn('source', $preferences->sources);
        }

        if (!empty($preferences->authors)) {
            $query->whereIn('author', $preferences->authors);
        }

        $query->latest('published_at');
        $articles = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'data' => $articles,
            'message' => 'Personalized feed fetched successfully'
        ]);
    }
    public function getOptions()
    {
        $categories = Article::distinct()->pluck('category');
        $sources = Article::distinct()->pluck('source');
        $authors = Article::distinct()->pluck('author');

        return response()->json([
            'data' => [
                'categories' => $categories,
                'sources' => $sources,
                'authors' => $authors,
            ],
            'message' => 'Preference options fetched successfully'
        ]);
    }
}
