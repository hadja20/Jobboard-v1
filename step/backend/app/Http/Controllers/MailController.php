<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MailController extends Controller
{
    public function getAllMails()
    {
        return response()->json(Mail::all(), 200);
    }

    public function getMailById($id)
    {
        $mail = Mail::find($id);
        if (is_null($mail)) {
            return response()->json(['message' => 'Mail Not Found'], 404);
        }
        return response()->json($mail::find($id), 200);
    }

    public function createMail(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'from' => 'required|string|email|max:100',
            'to' => 'required|string|email|max:100',
            'body' => 'required|string',
            'subject' => 'required|string|max:100'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        try {
            $mail = Mail::create($request->all());
            return response()->json($mail, 201);
        } catch (\Exception $e) {            
            return response()->json(['message' => 'An error occured']);
        }
    }

    public function deleteMail($id)
    {
        $mail = Mail::find($id);
        if (is_null($mail)) {
            return response()->json(['message' => 'Mail Not Found'], 404);
        }

        $mail->delete();
        return response()->json(['null'], 204);
    }
}
