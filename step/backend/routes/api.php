<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\AdvertisementsController;
use App\Http\Controllers\JobseekerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplyController;

/*routes accessibles à tous nos utilisateurs, authentifiés ou non */

Route::get('/advertisements', [AdvertisementsController::class, 'getAllAdvertisements']);
Route::get('/advertisements/{id}', [AdvertisementsController::class, 'getAdvertisementById']);
Route::get('/advertisements-company', [AdvertisementsController::class, 'searchByCompanyName']);
Route::get('/advertisements-postcode', [AdvertisementsController::class, 'searchByPostCode']);
Route::get('/companies', [CompanyController::class, 'getAllCompanies']);
Route::get('/companies/{id}', [CompanyController::class, 'getCompanyById']);
Route::get('/companies/{id}/advertisements', [CompanyController::class, 'getAllAdvertisementsOfCompany']);
Route::get('/advertisements/recruiter/{id}', [AdvertisementsController::class, 'getRecruiterOfAdvertisement']);


/* TEST DE L'API */


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {

    //AUTHENTIFICATION
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register/recruiter', [RecruiterController::class, 'registerRecruiter']);
    Route::post('/register/admin', [AdminController::class, 'registerAdmin']);
    Route::post('/register/jobseeker', [JobseekerController::class, 'registerJobseeker']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);


    //ADMIN


    Route::get('/people', [PersonController::class, 'getAllPeople'])->middleware('role:admin');
    Route::get('/people/{id}', [PersonController::class, 'getPersonById'])->middleware('role:admin');
    Route::delete('/people/{id}', [PersonController::class, 'deletePerson'])->middleware('role:admin');
    Route::post('/people', [PersonController::class, 'createPerson'])->middleware('role:admin');
    Route::put('/people/{id}', [PersonController::class, 'updatePerson'])->middleware('role:admin');

    Route::get('/recruiters', [RecruiterController::class, 'getAllRecruiters'])->middleware('role:admin');
    Route::get('/recruiters/{id}', [RecruiterController::class, 'getRecruiterById'])->middleware('role:admin');
    Route::delete('/recruiters/{id}', [RecruiterController::class, 'deleteRecruiter'])->middleware('role:admin');


    Route::get('/admins', [AdminController::class, 'getAllAdmins'])->middleware('role:admin');
    Route::get('/admins/{id}', [AdminController::class, 'getAdminById'])->middleware('role:admin');
    Route::delete('/admins/{id}', [AdminController::class, 'deleteAdmin'])->middleware('role:admin');
    Route::put('/admins/{id}', [AdminController::class, 'updateAdmin'])->middleware('role:admin');
    Route::get('/admins/advertisements/{id}', [AdminController::class, 'test'])->middleware('role:admin');
   
    Route::delete('/advertisements/{id}', [AdvertisementsController::class, 'deleteAdvertisement'])->middleware('role:admin|recruiter');
    Route::post('/advertisements/{id}', [AdvertisementsController::class, 'updateAdvertisement'])->middleware('role:admin|recruiter');
    Route::post('/advertisements', [AdvertisementsController::class, 'createAdvertisement'])->middleware('role:admin|recruiter');


    Route::get('/jobseekers', [JobseekerController::class, 'getAllJobseekers'])->middleware('role:admin|recruiter');
    Route::get('/jobseekers/{id}', [JobseekerController::class, 'getJobseekerById'])->middleware('role:admin|recruiter');
    Route::delete('/jobseekers/{id}', [JobseekerController::class, 'deleteJobseeker'])->middleware('role:admin|recruiter');


    //RECRUITER


    Route::post('/recruiters/{id}', [RecruiterController::class, 'updateRecruiter'])->middleware('role:recruiter');
    Route::get('/recruiters/{id}/advertisements', [RecruiterController::class, 'getAllAdvertisementsOfRecruiter'])->middleware('role:recruiter|admin');
    Route::get('/recruiters/{id}/mails', [RecruiterController::class, 'getAllMailsReceivedByRecruiter'])->middleware('role:recruiter');
    Route::get('/admins/{id}/mails', [AdminController::class, 'getAllMailsReceivedByAdmin'])->middleware('role:admin');
    
    Route::delete('/companies/{id}', [CompanyController::class, 'deleteCompany'])->middleware('role:admin|recruiter');
    Route::get('/companies/{id}/recruiters', [CompanyController::class, 'getAllRecruitersOfCompany'])->middleware('role:admin|recruiter');
    Route::post('/companies/{id}', [CompanyController::class, 'updateCompany'])->middleware('role:admin|recruiter');
    Route::post('/companies', [CompanyController::class, 'createCompany']);


    Route::get('/applications', [ApplyController::class, 'getAllApplications'])->middleware('role:admin');
    Route::get('/applications/{id}', [ApplyController::class, 'getApplicationById'])->middleware('role:admin');
    Route::delete('/applications/{id}', [ApplyController::class, 'cancelApplication'])->middleware('role:admin');


    //JOBSEEKER


    Route::post('/applications/{id}', [ApplyController::class, 'getApplicationById'])->middleware('role:jobseeker');
    Route::post('/jobseekers/{id}', [JobseekerController::class, 'updateJobseeker'])->middleware('role:jobseeker|admin'); 
    Route::get('/jobseekers/{id}/applications', [JobseekerController::class, 'getAllApplicationsOfJobseeker'])->middleware('role:jobseeker');
    Route::get('/jobseekers/{id}/mails', [JobseekerController::class, 'getAllMailsSentByJobseeker'])->middleware('role:jobseeker');
    Route::post('/applications/advertisement/apply', [ApplyController::class, 'apply'])->middleware('role:jobseeker');
    Route::get('/jobseekers/{id}/hasApply/{ad}', [JobseekerController::class, 'hasAppliedToAdvertisement'])->middleware('role:jobseeker');



});




/*
    Route::get('/mails', [MailController::class, 'getAllMails']);
    Route::get('/mails/{id}', [MailController::class, 'getMailById']);
    Route::delete('/mails/{id}', [MailController::class, 'deleteMail']);
    Route::post('/mails', [MailController::class, 'createMail']);
    Route::put('/mails/{id}', [MailController::class, 'updateMail']);
*/

