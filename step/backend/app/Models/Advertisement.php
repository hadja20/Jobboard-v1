<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;


    protected $fillable = ['title', 'description', 'postcode', 'city','places', 'contract', 'salary', 'recruiter_id'];

    public function recruiter(){
        return $this->belongsTo(Recruiter::class);
    }
}
