<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserNewsCategory extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $table = 'user_news_catgeory';

    /**
     * @desc The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'user_id',
        'newsfeed_id',
        'category_id',
        'status',
        'created_at'
    ];
    
    /**
     * @name unsaveCategory
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function unsaveCategory($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>0]);
    }

    
    /**
     * @name checkCategroryId
     * @desc check category id
     * @param $id
     * @return mixed
     */
    public static function checkCategroryId($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->first();
    }

    
    /**
     * @name updateCategroryId
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function updateCategroryId($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>1]);
    }
}
