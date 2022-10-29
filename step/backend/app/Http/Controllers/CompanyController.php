<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    public function getAllCompanies()
    {
        return response()->json(Company::all(), 200);
    }

    public function createCompany(Request $request)    
    {       
        try{
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|unique:companies',
                'website' => 'required|string',
                'description' => 'string|required',
                'logo'=>'required|image|file'
            ]);
    
            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }
    
            $input=$request->all();
            if($request->hasFile('logo')){
              $destination_path='public/images/companiesLogo';
              $logo=$request->file('logo');
              $logo_name=$logo->getClientOriginalName();
              $path=$request->file('logo')->storeAs($destination_path,$logo_name);
              $input['logo']=$logo_name;
              
            }      
          
            $company = Company::create($input);
            return response()->json(['company'=>$company, "logo"=>$request->file('logo')], 201);
       
        } 

        catch(Exception $e){

            return response()->json(['message' => 'An error occured '],400);
        }
       }


    public function getCompanyById($id)
    {
        $company = Company::find($id);
        if (is_null($company)) {
            return response()->json(['message' => 'Company Not Found'], 404);
        }
        return response()->json($company::find($id), 200);
    }


    public function deleteCompany($id)
    {
        $company = Company::find($id);
        if (is_null($company)) {
            return response()->json(['message' => 'Company Not Found'], 404);
        }

        DB::table('people')
            ->join('recruiters', 'people.id', '=', 'person_id')
            ->join('companies', 'company_id', '=', 'companies.id')
            ->where('company_id', '=', $id)
            ->delete();
        $company->delete();

        if(Storage::exists('public/images/companiesLogo'.$company->logo)){
            Storage::delete('public/images/companiesLogo'.$company->logo);
          }
        return response()->json(['message' => 'Company deleted succesfully']);
    }

    public function updateCompany(Request $request, $id)
    {
        $input=$request->all();
        $company = Company::find($id);
        if (is_null($company)) {
            return response()->json(['message' => 'Company Not Found'], 404);
        }
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'string|unique:companies',
                'website' => 'string',
                'logo' => '',
                'description' => 'string'
            ]);
    
            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }

            if($request->hasFile('logo')){
                if(Storage::exists('public/images/companiesLogo'.$company->logo)){
                    Storage::delete('public/images/companiesLogo'.$company->logo);
                  }
                $destination_path='public/images/companiesLogo';
                $logo=$request->file('logo');
                $logo_name=$logo->getClientOriginalName();
                $path=$request->file('logo')->storeAs($destination_path,$logo_name);
                $input['logo']=$logo_name;
                
              }     
           

            $company->update($input);
            return  response()->json($company, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occured '], 404);
        }

     
    }

    public function getAllRecruitersOfCompany($id)
    {
        $company = Company::find($id);
        if (is_null($company)) {
            return response()->json(['message' => 'Company Not Found'], 404);
        }


        $recruiters = DB::table('recruiters')
            ->join('people', 'people.id', '=', 'person_id')
            ->join('companies', 'companies.id', '=', 'company_id')
            ->where('companies.id','=',$id)
            ->first();


        return response()->json($recruiters, 200);
    }


    public function getAllAdvertisementsOfCompany($id){
        $company=Company::find($id);
        if(is_null($company)){
            return response()->json(['message' => 'Company Not Found'], 404);
        }

        $ad=DB::table('companies')
        ->join('recruiters','companies.id','=','company_id')
        ->join('advertisements', 'person_id','=','recruiter_id')
        ->where('companies.id','=',$id)
        ->get();
        return response()->json($ad, 200);

    }
}
