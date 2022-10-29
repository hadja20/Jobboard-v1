<?php

namespace App\Http\Controllers;

use App\Models\Person;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonController extends Controller
{
    public function getAllPeople()
    {
        $people = DB::table('people')
            ->join('roles', 'role_id', '=', 'roles.id')
            ->select('firstName','lastName','email','people.id as person_id','name')
            ->get();
        return response()->json($people, 200);
    }

    public function getPersonById($id)
    {
        $person = Person::find($id);
        if (is_null($person)) {
            return response()->json(['message' => 'Person Not Found'], 404);
        }
        return response()->json($person::find($id), 200);
    }


    public function deletePerson($id)
    {
        $person = Person::find($id);
        if (is_null($person)) {
            return response()->json(['message' => 'Person Not Found'], 404);
        }
        $person->delete();
        return response()->json(null, 204);
    }

    public function createPerson(Request $request)
    {
        $person = Person::create($request->all());
        return response($person, 201);
    }


    public function updatePerson(Request $request, $id)
    {
        $person = Person::find($id);
        if (is_null($person)) {
            return response()->json(['message' => 'Person Not Found'], 404);
        }
        $person->update($request->all());

        return response($person, 200);
    }
}
