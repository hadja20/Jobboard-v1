<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobseeker extends Model
{
    use HasFactory;
    protected $fillable = ['bio', 'phone', 'cv', 'cover_letter', 'person_id'];


    public function person(){
        return $this->belongsTo(Person::class);
    }
}
