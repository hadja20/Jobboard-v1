<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use App\Models\Apply;
use App\Models\Jobseeker;
use App\Models\Mail;

use Exception;
use Illuminate\Support\Facades\DB;

class ApplyController extends Controller
{
    public function getAllApplications()
    {
        $applications = DB::table('applies')
            ->join('jobseekers', 'jobseekers.id', '=', 'jobseeker_id')
            ->join('people', 'people.id', '=', 'jobseekers.person_id')
            ->join('advertisements', 'advertisements.id', '=', 'applies.advertisement_id')
            ->select('name', 'logo', 'places', 'salary', 'contract', 'title', 'city', 'postcode', "applies.id as id")
            ->get();

        return response()->json($applications, 200);
    }

    public function getApplicationById($id)
    {
        $application = Apply::find($id);
        if (is_null($application)) {
            return response()->json(["message" => "Application Not Found"], 200);
        }

        $application = DB::table('applies')
            ->join('jobseekers', 'jobseekers.id', '=', 'jobseeker_id')
            ->join('people', 'people.id', '=', 'jobseekers.person_id')
            ->join('advertisements', 'advertisements.id', '=', 'applies.advertisement_id')
            ->where('applies.id', '=', $id)
            ->get();

        return response()->json($application, 200);
    }


    public function apply(Request $request)
    {
        $exist_ad = Advertisement::find($request->advertisement_id);

        if (is_null($exist_ad)) {
            return response()->json(["message" => "Advertisement Not Found"], 200);
        }

        $exist_jobseeker = Jobseeker::find($request->jobseeker_id);
        if (is_null($exist_jobseeker)) {
            return response()->json(["message" => "Jobseeker Not Found"], 200);
        }

        $jobseeker = DB::table('people')
            ->join('jobseekers', 'people.id', '=', 'person_id')
            ->where('jobseekers.id', '=', $request->jobseeker_id)
            ->select('jobseekers.id as id', 'email')
            ->first();


        $recruiter = DB::table('advertisements')
            ->join('recruiters', 'person_id', '=', 'recruiter_id')
            ->join('people', 'people.id', '=', 'person_id')
            ->where('advertisements.id', '=', $request->advertisement_id)
            ->select('recruiters.id as id', 'email')
            ->first();

        $hasApply = DB::table('applies')
            ->join('jobseekers', 'jobseekers.id', '=', 'applies.jobseeker_id')
            ->join('advertisements', 'advertisements.id', '=', 'advertisement_id')
            ->where('applies.advertisement_id', $request->advertisement_id)
            ->where('applies.jobseeker_id', $request->jobseeker_id)
            ->exists();

        if (!$hasApply) {
            try {
                $from = $jobseeker->email;

                $to = $recruiter->email;

                $mail = Mail::create([
                    "from" => $from,
                    "to" => $to,
                    "subject" => $request->subject,
                    "body" => $request->body,
                    "jobseeker_id" => $jobseeker->id,
                    "recruiter_id" => $recruiter->id
                ]);
            } catch (Exception $e) {
                return response()->json(['message' => 'An error occured while creating email ' . $e], 400);
            }

            try {

                $application = Apply::create(
                    [
                        'mail_id' => $mail->id,
                        'advertisement_id' => $request->advertisement_id,
                        'jobseeker_id' => $request->jobseeker_id
                    ]
                );
                return response()->json($application, 200);
            } catch (Exception $e) {
                $mail->delete();
                return response()->json(['message' => 'An error occured'], 400);
            }
        }
        return response()->json(['message' => 'You\'ve already applied to this advertisement'], 400);
    }


    public function cancelApplication($id)
    {
        $application = Apply::find($id);
        if (is_null($application)) {
            return response()->json(["message" => "Application Not Found"], 404);
        }
        $application->delete();
    }
}
