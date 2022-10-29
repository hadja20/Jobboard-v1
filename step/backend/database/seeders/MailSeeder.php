<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mail;
class MailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $mails=[
        [
            'id'=>1,
            "subject"=>"Offre emploi: Data Analyst",
            "from"=>"rechercheur1@mail.com",
            "to"=>"testrecruteur@mail.com",
            "body"=>"Je souhaite postuler à cette offre",
            "jobseeker_id"=>1,
            "recruiter_id"=>1
        ]
        ];
        Mail::insert($mails);
    }
}
