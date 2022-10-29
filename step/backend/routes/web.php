<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\JobseekerController;
use App\Http\Controllers\RecruiterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


/*Route::resource('companies', CompanyController::class);
Route::resource('mails', MailController::class);
Route::resource('jobseekers', JobseekerController::class);
Route::resource('recruiters', RecruiterController::class);*/