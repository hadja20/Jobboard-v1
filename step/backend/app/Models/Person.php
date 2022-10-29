<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;

/*ce que j'ai ajouté pour rendre le modele authenticable*/
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Person extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    

    protected $fillable = ['firstName', 'lastName', 'email', 'password', 'role_id'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }   
    
    public function jobseekers(){
        return $this->hasMany(Jobseeker::class);
    }

    public function recruiters(){
        return $this->hasMany(Recruiter::class);
    }

    public function admins(){
        return $this->hasMany(Admin::class);
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }
 
}
