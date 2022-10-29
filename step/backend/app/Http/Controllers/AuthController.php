<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register/recruiter', 'register/admin', 'register/jobseeker']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }



    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile()
    {
        if (auth()->user()->role_id == 1) {
            $user = DB::table('people')
                ->join('admins', 'people.id', '=', 'person_id')
                ->where('person_id', '=', auth()->user()->id)
                ->first();
        } elseif (auth()->user()->role_id == 2) {
            $user = DB::table('people')
                ->join('recruiters', 'people.id', '=', 'person_id')
                ->where('person_id', '=', auth()->user()->id)
                ->first();
        } elseif (auth()->user()->role_id == 3) {
            $user = DB::table('people')
                ->join('jobseekers', 'people.id', '=', 'person_id')
                ->where('jobseekers.id', '=', auth()->user()->id)
                ->first();
        }
        return response()->json($user);
    }

    protected function createNewToken($token)
    {

        if (auth()->user()->role_id == 1) {
            $user = DB::table('people')
                ->join('admins', 'people.id', '=', 'person_id')
                ->where('person_id', '=', auth()->user()->id)
                ->first();
        } elseif (auth()->user()->role_id == 2) {
            $user = DB::table('people')
                ->join('recruiters', 'people.id', '=', 'person_id')
                ->where('person_id', '=', auth()->user()->id)
                ->first();
        } elseif (auth()->user()->role_id == 3) {
            $user = DB::table('people')
                ->join('jobseekers', 'people.id', '=', 'person_id')
                ->where('person_id', '=', auth()->user()->id)
                ->first();
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => $user
        ]);
    }
}
