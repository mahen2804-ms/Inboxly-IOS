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
        'status',
        'created_at'
    ];


    /**
     * @name validationRules
     * @desc validation rules
     * @return array
     */
    public static function validationRules() {

        return [
            'category' => 'required|max:25|regex:/^[A-Za-z .,-]*$/',
        ];
    }

    /**
     * @category Validation messages
     * @var array
     */
    public static $validationMessages = [
        'category.required'=> 'Category is required',
        'category.regex' => 'Category contains only alphabets characters', 
        'category.max' => 'Category should have max 25 characters.'

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
                   'created_at',
                   'status'
                  ];

       return self::select($column)
        	->orderBy('id','desc')
            ->get();
    }

    /**
     * @name allActiveCategories
     * @desc check
      already exist or not
     * @param $email
     * @return mixed
     */
    public static function allActiveCategories() {
        $column = [
                   'id',
                   'name',
                   'created_at',
                   'status'
                  ];

       return self::select($column)
            ->orderBy('id','desc')
            ->where('status', 1)
            ->get();
    }
    
    
}
