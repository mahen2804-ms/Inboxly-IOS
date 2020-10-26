<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    public $table = 'categories';

    /**
     * @desc The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'name',
        'status'
    ];


    /**
     * @name validationRules
     * @desc validation rules
     * @return array
     */
    public static function validationRules() {

        return [
            'name' => 'required|max:25|regex:/^[A-Za-z .,-]*$/',
        ];
    }

    /**
     * @name Validation messages
     * @var array
     */
    public static $validationMessages = [
        'name.required'=> 'Category name is required',
        'name.regex' => 'Category name contains only alphabets characters', 
        'name.max' => 'Category name should have max 25 characters.'

    ]; 


    /**
     * @name checkcategoryName
     * @desc check
      already exist or not
     * @param $email
     * @return mixed
     */
    public static function checkCategoryName($categoryName) {
        return self::where('name', $categoryName)
            ->where('status', 1)
            ->first();
    }

     /**
     * @name allCategoriesList
     * @desc check
      already exist or not
     * @param $email
     * @return mixed
     */
    public static function allCategoriesList() {
    	$column = [
                   'id',
                   'name',
                   'status'
                  ];

       return self::select($column)
        	->where('status', 1)
        	->orderBy('id','desc')
            ->get();
    }
    
}
