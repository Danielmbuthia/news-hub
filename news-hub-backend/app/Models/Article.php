<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $casts = [
        'published_at' => 'datetime',
    ];
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;
    protected $fillable = ['title', 'content', 'author', 'source', 'category', 'url', 'published_at', 'image_url'];
}
