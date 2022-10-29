<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class AdvertisementsController extends Controller
{
    public function getAllAdvertisements()
    {

        try {
            $admin_ad=DB::table('advertisements')
            ->join('admins', 'admins.person_id', '=', 'recruiter_id')           
            ->join('companies', 'companies.id', '=', 'admins.company_id')               
            ->select('name', 'logo', 'places', 'salary', 'contract', 'title', 'city', 'postcode', 'advertisements.id as advertisement_id', 'advertisements.description as description', 'advertisements.recruiter_id as recruiter_id', 'companies.id as company_id')
            ->get();
            $advertisements = DB::table('advertisements')
                ->join('recruiters', 'recruiters.person_id', 'advertisements.recruiter_id')
                ->join('companies', 'companies.id', '=', 'recruiters.company_id')               
                ->select('name', 'logo', 'places', 'salary', 'contract', 'title', 'city', 'postcode', 'advertisements.id as advertisement_id', 'advertisements.description as description', 'advertisements.recruiter_id as recruiter_id', 'companies.id as company_id')
                ->get();
            return response()->json($admin_ad->merge($advertisements), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occured ' . $e], 400);
        }
    }

    public function getAdvertisementById($id)
    {
        $ad = Advertisement::find($id);
        if (is_null($ad)) {
            return response()->json(['message' => 'Advertisement Not Found'], 404);
        }
        return response()->json($ad::find($id), 200);
    }

    public function createAdvertisement(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'postcode' => 'required|string',
            'city' => 'required|string',
            'places' => 'required|integer',
            'contract' => 'required|string',
            'salary' => 'required|integer',
            'recruiter_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        try {
            $ad = Advertisement::create($request->all());
            return response($ad, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occured ' . $e], 400);
        }
    }

    public function updateAdvertisement(Request $request, $id)
    {
        $ad = Advertisement::find($id);
        if (is_null($ad)) {
            return response()->json(['message' => 'Advertisement Not Found'], 404);
        }

        try {
            $validator = Validator::make($request->all(), [
                'title' => 'string',
                'description' => 'string',
                'postcode' => 'string',
                'city' => 'string',
                'places' => 'integer',
                'contract' => 'string',
                'salary' => 'integer',
                'recruiter_id' => 'integer'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }


            $ad->update($request->all());
            return response()->json(['message' => 'Advertisement updated succesfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occured' . $e], 404);
        }
    }

    public function deleteAdvertisement($id)
    {
        $ad = Advertisement::find($id);
        if (is_null($ad)) {
            return response()->json(['message' => 'Advertisement Not Found'], 404);
        }
        $ad->delete();
    }

    public function searchByCompanyName(Request $request)
    {
        $nameCompany = $request->name;
        if (!is_null($nameCompany)) {
            $companies = DB::table('companies')
                ->join('recruiters', 'company_id', '=', 'companies.id')
                ->join('advertisements', 'advertisements.recruiter_id', '=', 'recruiters.person_id')
                ->where('companies.name', 'like', '%' . $nameCompany . '%')
                ->orWhere('title', 'like', '%' . $nameCompany . '%')
                ->get();
            return response()->json($companies, 201);
        }
    }


    public function searchByPostCode(Request $request)
    {
        $postcode = $request->search;
        if (!is_null($postcode)) {
            $companies = DB::table('companies')
                ->join('recruiters', 'company_id', '=', 'companies.id')
                ->join('advertisements', 'advertisements.recruiter_id', '=', 'recruiters.person_id')
                ->where('postcode', 'like', '%' . $postcode . '%')
                ->orWhere('city', 'like', '%' . $postcode . '%')
                ->get();
            return response()->json($companies, 201);
        }
    }

    public function getRecruiterOfAdvertisement($id)
    {
        $ad = Advertisement::find($id);
        if (is_null($ad)) {
            return response()->json(['message' => 'Advertisement Not Found'], 404);
        }
        $recruiter = DB::table('advertisements')
            ->join('recruiters', 'person_id', '=', 'recruiter_id')
            ->join('people', 'people.id', '=', 'person_id')
            ->where('recruiters.id', '=', $id)
            ->first();

        return response($recruiter, 201);
    }
}
