<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArchiveNewsfeed extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $table = 'archive_newsfeed';

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
    public static function unarchiveNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>0]);
    }

    /**
     * @name checkArchivedNews
     * @desc check category id
     * @param $id
     * @return mixed
     */
    public static function checkArchivedNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->first();
    }

    
    /**
     * @name updateArchivedNews
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function updateArchivedNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>1]);
    }

    /**
     * @name deleteArchivedNews
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function deleteArchivedNews($userId, $newsfeedId, $categoryId) {
        return self::where('user_id', $userId)->where('newsfeed_id', $newsfeedId)->where('category_id', $categoryId)->update(['status'=>0, 'deleted_at'=>NOW()]);
    }
}
