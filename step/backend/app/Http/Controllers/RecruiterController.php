<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Recruiter;
use App\Models\Company;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RecruiterController extends Controller
{
    public function getAllRecruiters()
    {
        $recruiters = DB::table('people')
            ->join('recruiters', 'people.id', '=', 'person_id')
            ->select('person_id',"recruiters.id", "firstName","lastName","email")           
            ->get();
        return response()->json($recruiters, 200);
    }

    public function getRecruiterById($id)
    {
        $recruiter = Recruiter::find($id);
        if (is_null($recruiter)) {
            return response()->json(['message' => 'Recruiter Not Found'], 404);
        }
        $recruiter = DB::table('people')
            ->join('recruiters', 'people.id', '=', 'person_id')
            ->where('recruiters.id', '=', $id)
            ->first();

        return response()->json($recruiter, 200);
    }

    public function deleteRecruiter($id)
    {
        $recruiter = Recruiter::find($id);
        if (is_null($recruiter)) {
            return response()->json(['message' => 'Recruiter Not Found'], 404);
        }

        $person = Person::find($recruiter['person_id']);
        $recruiter->delete();
        $person->delete();
        return response()->json(['null'], 204);
    }


    public function updateRecruiter(Request $request, $id)
    {
        $recruiter = Recruiter::find($id);
        if (is_null($recruiter)) {
            return response()->json(['message' => 'Recruiter Not Found'], 404);
        }
        try {

            $person = Person::find($recruiter->person_id);
            $person->update($request->all());
            $user=DB::table('people')
            ->join('recruiters','people.id','=', 'person_id')
            ->where('recruiters.id', $id)
            ->first();
            return response()->json(['message' => 'Recruiter updated succesfully',"user"=>$user], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occured' . $e], 404);
        }
    }

    public function getAllAdvertisementsOfRecruiter($id)
    {
        $recruiter = Recruiter::find($id);
        if (is_null($recruiter)) {
            return response()->json(['message' => 'Recruiter Not Found'], 404);
        }
        $ad = DB::table('recruiters')
            ->join('advertisements', 'recruiters.person_id', '=', 'recruiter_id')
            ->join('people', 'people.id', '=', 'person_id')
            ->where('recruiters.id', '=', $id)
            ->select('advertisements.id as id', 'title', 'description', 'city', 'postcode','contract', 'salary','places')           
            ->get();            

        return response()->json($ad, 201);
    }


    public function registerRecruiter(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|between:2,100',
            'lastName' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:people',
            'password' => 'required|string|min:6|same:password_confirmation',
            'password_confirmation' => 'required',
            'company_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $company = Company::find($request['company_id']);
        if (is_null($company)) {
            return response()->json(['message' => 'Company Not Found'], 404);
        }
        $person = Person::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'role_id' => 2
            ]
        ));
        Recruiter::create([
            'person_id' => $person['id'],
            'company_id' => $company['id'],
        ]);

        $recruiter = DB::table('people')
            ->join('recruiters', 'people.id', '=', 'person_id')
            ->join('roles', 'roles.id', '=', 'role_id')
            ->where('person_id', '=', $person['id'])
            ->get();

        return response()->json([
            'message' => 'Recruiter successfully registered',
            'recruiter' => $recruiter
        ], 201);
    }

    public function getAllMailsReceivedByRecruiter($id)
    {
        $recruiter = Recruiter::find($id);
        if (is_null($recruiter)) {
            return response()->json(['message' => 'Recruiter Not Found'], 404);
        }
        try {
            $recruiter = DB::table('people')
                ->join('recruiters', 'people.id', '=', 'person_id')
                ->where('recruiters.id', '=', $id)
                ->first();


            $mails = DB::table('recruiters')
                ->join('people', 'people.id', '=', 'person_id')
                ->join('mails', 'recruiter_id', '=', 'recruiters.id')
                ->where('to', '=', $recruiter->email)
                ->select('from', 'to', 'mails.id as mail_id', 'subject', 'body')
                ->get();

            return response()->json($mails, 200);
        } catch (\Exception $e) {

            return response()->json(['message' => 'An error occured'], 404);
        }
    }
}
