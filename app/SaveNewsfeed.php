<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

class SaveNewsfeed extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $table = 'save_newsfeed';

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
    public static function unsaveNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>0]);
    }

    /**
     * @name checkSavedNews
     * @desc check category id
     * @param $id
     * @return mixed
     */
    public static function checkSavedNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->first();
    }

    
    /**
     * @name updateSavedNews
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function updateSavedNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>1]);
    }
    
    /**
     * @name deleteSavedNews
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function deleteSavedNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>0, 'deleted_at'=>NOW()]);
    }
}
