<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SenderDetails extends Model
{
    use HasFactory;

    public $table = 'sender_details';

     /**
     * @desc The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'name',
        'user_id',
        'status',
        'created_at',
        'updated_at'
    ];
}
