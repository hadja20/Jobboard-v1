<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Person;
use App\Models\Recruiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{


    public function test($id)
    {
        $admin = Admin::find($id);
        if (is_null($admin)) {
            return response()->json(['message' => 'Admin Not Found'], 404);
        }
        $ad = DB::table('admins')
            ->join('advertisements', 'admins.person_id', '=', 'recruiter_id')
            ->join('people', 'people.id', '=', 'person_id')
            ->where('people.id', '=', $id)
            ->select('advertisements.id as id', 'title', 'description', 'city', 'postcode','contract', 'salary','places')
            ->get();

        return response($ad, 201);
    }

    public function getAllAdmins()
    {
        $admins = DB::table('people')
            ->join('admins', 'people.id', '=', 'person_id')
            ->get();
        return response()->json($admins, 200);
    }

    public function getAdminById($id)
    {
        $admin = Admin::find($id);
        if (is_null($admin)) {
            return response()->json(['message' => 'Admin Not Found'], 404);
        }
        $admin = DB::table('people')
            ->join('admins', 'people.id', '=', 'person_id')
            ->where('admins.id', '=', $id)
            ->first();

        return response()->json($admin, 200);
    }


    public function registerAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|between:2,100',
            'lastName' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:people',
            'password' => 'required|string|min:6|same:password_confirmation',
            'password_confirmation' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $person = Person::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'role_id' => 1
            ],

        ));

        Admin::create([
            'person_id' => $person['id']
        ]);

        $admin = DB::table('people')
            ->join('admins', 'people.id', '=', 'person_id')
            ->join('roles','roles.id','=','role_id')
            ->where('person_id', '=', $person['id'])
            ->select('admins.id as admin_id', 'person_id', 'firstName', 'lastName', 'email', 'password', 'name', 'role_id')
            ->first();
     
        return response()->json([
            'message' => 'User successfully registered',
            'admin' => $admin
        ], 201);
    }


    public function deleteAdmin($id)
    {
        $admin = Admin::find($id);
        if (is_null($admin)) {
            return response()->json(['message' => 'Admin Not Found'], 404);
        }

        $person = Person::find($admin['person_id']);
        $admin->delete();
        $person->delete();
        return response()->json(['null'], 204);
    }


    public function updateAdmin(Request $request, $id)
    {
        $admin = Admin::find($id);
        if (is_null($admin)) {
            return response()->json(['message' => 'Admin Not Found'], 404);
        }
        
        $user=DB::table('people')
        ->join('admins','people.id','=', 'person_id')
        ->where('admins.id', $id)
        ->first();
        try {
            $person = Person::find($admin->person_id);
            $person->update($request->all());
            return response()->json(['message' => 'Admin updated succesfully', "user"=>$user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occured' . $e], 404);
        }
    }


    public function getAllMailsReceivedByAdmin($id)
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
                ->where('to', '=',"recruteur-admin2@mail.com")
                ->select('from', 'to', 'mails.id as mail_id', 'subject', 'body')
                ->get();

            return response()->json($mails, 200);
        } catch (\Exception $e) {

            return response()->json(['message' => 'An error occured'], 404);
        }
    }


}
