<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruiter extends Model
{
    use HasFactory;

    protected $fillable = ['person_id', 'company_id'];


    public function person(){
        return $this->belongsTo(Person::class);
    }


    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function advertisements(){
        return $this->hasMany(Advertisement::class);
    }
}
