<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsfeed extends Model
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
			        'sender_details.name as sender_name'
                ];

       $records =  self::select($column)
       		->join('sender_details', 'newsfeed.sender_id', '=', 'sender_details.id');

       if(!empty($filter) && $filter) {
       		$records = $records->whereRaw("(newsfeed.title like '%".$filter."%' or newsfeed.description like '%".$filter."%')");
       }

       $records = $records->where('newsfeed.status', 1)
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
    
}
