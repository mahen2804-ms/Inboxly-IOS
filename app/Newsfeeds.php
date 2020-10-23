<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsfeeds extends Model
{
    use HasFactory;

    public $table = 'newsfeed';

     /**
     * @desc The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'title',
        'image',
        'description',
        'user_id',
        'sender_id',
        'date_time',
        'status',
        'created_at',
        'updated_at'
    ];
}
