<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use App\Models\Jobseeker;
use App\Models\Person;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class JobseekerController extends Controller
{

    public function getAllJobseekers()
    {
        $jobseeker = DB::table('jobseekers')
            ->join('people', 'people.id', '=', 'person_id')
            ->select('person_id',"jobseekers.id", "firstName","lastName","email","cover_letter", "bio", "cv", "phone")
            ->get();
        return response()->json($jobseeker, 200);
    }

    public function getJobseekerById($id)
    {
        $jobseeker = Jobseeker::find($id);
        if (is_null($jobseeker)) {
            return response()->json(['message' => 'Jobseeker Not Found'], 404);
        }
        $jobseeker = DB::table('people')
            ->join('jobseekers', 'people.id', '=', 'person_id')
            ->where('jobseekers.id', '=', $id)
            ->first();
        return response()->json($jobseeker, 200);
    }

    public function deleteJobseeker($id)
    {
        $jobseeker = Jobseeker::find($id);
        if (is_null($jobseeker)) {
            return response()->json(['message' => 'Jobseeker Not Found'], 404);
        }

        if (Storage::exists('public/files/' . $jobseeker->cv)) {
            Storage::delete('public/files/' . $jobseeker->cv);
        }

        if (Storage::exists('public/files/' . $jobseeker->cover_letter)) {
            Storage::delete('public/files/' . $jobseeker->cover_letter);
        }

        $person = Person::find($jobseeker['person_id']);
        $jobseeker->delete();
        $person->delete();
        return response()->json(['message' => 'Jobseeker Deleted Succesfully'], 204);
    }


    public function updateJobseeker(Request $request, $id)
    {
        $jobseeker = Jobseeker::find($id);
        if (is_null($jobseeker)) {
            return response()->json(['message' => 'Jobseeker Not Found'], 404);
        }
        try {
            $person = Person::find($jobseeker->person_id);
            $destination_path = 'public/files';
            $input = $request->all();

            if ($request->hasFile('cv')) {
                if (Storage::exists('public/files/' . $jobseeker->cv)) {
                    Storage::delete('public/files/' . $jobseeker->cv);
                }
                $cv = $request->file('cv');
                $cv_name = time() . $cv->getClientOriginalName();
                $path = $request->file('cv')->storeAs($destination_path, $cv_name);
                $input['cv'] = $cv_name;
            }

            if ($request->hasFile('cover_letter')) {
                if (Storage::exists('public/files/' . $jobseeker->cover_letter)) {
                    Storage::delete('public/files/' . $jobseeker->cover_letter);
                }
                $lm = $request->file('cover_letter');
                $lm_name = time() . $lm->getClientOriginalName();
                $path = $request->file('cover_letter')->storeAs($destination_path, $lm_name);
                $input['cover_letter'] = $lm_name;
                echo 'j ai une lettre de motivation';
            }
            $person->update($request->all());
            $jobseeker->update($input);

            $user=DB::table('people')
            ->join('jobseekers','people.id','=', 'person_id')
            ->where('jobseekers.id', $id)
            ->first();
            return response()->json(['message' => 'Jobseeker updated succesfully', "user"=>$user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occured' . $e], 404);
        }
    }

    public function getAllApplicationsOfJobseeker($id)
    {
        $jobseeker = Jobseeker::find($id);
        if (is_null($jobseeker)) {
            return response()->json(['message' => 'Jobseeker Not Found'], 404);
        }

        $applications = DB::table('applies')
            ->join('jobseekers', 'jobseekers.id', '=', 'jobseeker_id')
            ->join('advertisements', 'advertisements.id', '=', 'advertisement_id')           
            ->where('jobseeker_id', '=', $id)
            ->get();

        return response()->json($applications, 200);
    }

    public function registerJobseeker(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|between:2,100',
            'lastName' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:people',
            'password' => 'required|string|min:6|same:password_confirmation',
            'password_confirmation' => 'required',
            'cv' => 'mimes:pdf|max:2048',
            'cover_letter' => 'mimes:pdf|max:2048'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $destination_path = 'public/files';
        if ($request->hasFile('cv')) {
            $cv = $request->file('cv');
            $cv_name = time() . $cv->getClientOriginalName();
            $path = $request->file('cv')->storeAs($destination_path, $cv_name);
        } else {
            $cv_name = NULL;
        }

        if ($request->hasFile('cover_letter')) {
            $lm = $request->file('cover_letter');
            $lm_name = time() . $lm->getClientOriginalName();
            $path = $request->file('cover_letter')->storeAs($destination_path, $lm_name);
        } else {
            $lm_name = NULL;
        }

        $person = Person::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'role_id' => 3
            ]
        ));

        Jobseeker::create([
            'person_id' => $person['id'],
            'bio' => $request->bio,
            'phone' => $request->phone,
            'cv' => $cv_name,
            'cover_letter' => $lm_name
        ]);

        $jobseeker = DB::table('people')
            ->join('jobseekers', 'people.id', '=', 'person_id')
            ->join('roles', 'roles.id', '=', 'role_id')
            ->where('person_id', '=', $person['id'])
            ->get();

        return response()->json([
            'message' => 'Jobseeker successfully registered ',
            'jobseeker' => $jobseeker
        ], 201);
    }

    public function getAllMailsSentByJobseeker($id)
    {
        $jobseeker = Jobseeker::find($id);
        if (is_null($jobseeker)) {
            return response()->json(['message' => 'Jobseeker Not Found'], 404);
        }

        try {


            $jobseeker = DB::table('people')
                ->join('jobseekers', 'people.id', '=', 'person_id')
                ->where('jobseekers.id', '=', $id)
                ->first();

            $mails = DB::table('jobseekers')
                ->join('people', 'people.id', '=', 'person_id')
                ->join('mails', 'jobseeker_id', '=', 'jobseekers.id')
                ->where('from', '=', $jobseeker->email)
                ->select('mails.id as mail_id', 'from', 'to', 'subject', 'body')
                ->get();

            return response()->json($mails, 200);
        } catch (\Exception $e) {

            return response()->json(['message' => 'An error occured'], 404);
        }
    }

    public function hasAppliedToAdvertisement($id_jobseeker, $id_ad)
    {
        $ad = Advertisement::find($id_ad);
        if (is_null($ad)) {
            return response()->json(['message' => 'Advertisement Not Found'], 404);
        }

        $jobseeker = Jobseeker::find($id_jobseeker);
        if (is_null($jobseeker)) {
            return response()->json(['message' => 'Jobseeker Not Found'], 404);
        }

        $hasApply = DB::table('jobseekers')
            ->join('applies', 'applies.jobseeker_id', '=', 'jobseekers.id')
            ->join('advertisements', 'advertisements.id', '=', 'advertisement_id')
            ->where('advertisements.id', '=', $id_ad)
            ->where('jobseekers.id', '=', $id_jobseeker)
            ->exists();

            return response()->json($hasApply,201);
    }
}
