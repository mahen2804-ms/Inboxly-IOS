<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Newsfeed extends Model
{
    use HasFactory;
    use SoftDeletes;

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

     /**
     * @name allNewsfeedList 
     * @desc newsfeed al records
     * @param $email
     * @return mixed
     */
    public static function allNewsfeedList($filter = '') {
    	$column = [
          			'newsfeed.id',
                   	'newsfeed.title',
			        'newsfeed.user_id',
			        'newsfeed.image',
			        'newsfeed.description',
			        'newsfeed.user_id',
			        'newsfeed.sender_id',
			        'newsfeed.date_time',
			        'newsfeed.status',
			        'newsfeed.created_at',
			        'sender_details.name as sender_name',
              'sender_details.email as sender_email',
              'user_news_catgeory.category_id as category_id',
              //'categories.name as category_name'
                ];

       $records =  self::select($column)
       		->join('sender_details', 'newsfeed.sender_id', '=', 'sender_details.id')
          ->leftJoin('user_news_catgeory', 'user_news_catgeory.newsfeed_id', '=', 'newsfeed.id');
          // ->leftJoin('categories', 'categories.id', '=', 'user_news_catgeory.category_id');

       if(!empty($filter) && $filter) {
       		$records = $records->whereRaw("(newsfeed.title like '%".$filter."%' or newsfeed.description like '%".$filter."%')");
       }

       $records = $records->where('newsfeed.user_id', Auth::user()->id)
          ->where('newsfeed.status', 1)
        	->orderBy('newsfeed.id','desc')
            ->get();

        return $records;
    }

    /**
     * @name newsfeedDetails
     * @desc   
     * @param $email
     * @return mixed
     */
    public static function newsfeedDetails($id) {
    	$column = [
          			'newsfeed.id',
                   	'newsfeed.title',
			        'newsfeed.user_id',
			        'newsfeed.image',
			        'newsfeed.description',
			        'newsfeed.user_id',
			        'newsfeed.sender_id',
			        'newsfeed.date_time',
			        'newsfeed.status',
			        'newsfeed.created_at',
			        'sender_details.name as sender_name'
                ];

       return self::select($column)
       		->join('sender_details', 'newsfeed.sender_id', '=', 'sender_details.id')
        	->where('newsfeed.status', 1)
        	->where('newsfeed.id', $id)
        	->orderBy('newsfeed.id','desc')
            ->get();
    }

    /**
     * @name unsaveCategory
     * @desc update category status
     * @param $id
     * @return mixed
     */
    public static function deleteNews($userId, $newsfeedId) {
        return self::where('user_id', $userId)->where('id', $newsfeedId)->update(['status'=>0, 'deleted_at'=>NOW()]);
    }
    
}
