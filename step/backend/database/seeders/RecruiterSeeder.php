<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Recruiter;

class RecruiterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $recruiters=[ [
            'id' => 1,
            "person_id" => 2,
            "company_id" => 1
        ],  
        [
            'id' => 2,
            "person_id" => 4,
            "company_id" => 2
        ],  
        [
            'id' => 3,
            "person_id" => 5,
            "company_id" => 3
        ],  
        [
            'id' => 4,
            "person_id" => 6,
            "company_id" => 4
        ],             
        [
            'id' => 5,
            "person_id" => 7,
            "company_id" => 5
        ],             
        [
            'id' => 6,
            "person_id" => 8,
            "company_id" => 6
        ],             
        [
            'id' => 7,
            "person_id" => 9,
            "company_id" => 7
        ],             
        [
            'id' => 8,
            "person_id" => 10,
            "company_id" => 8
        ]

        ];

        Recruiter::insert($recruiters);
      
    }
}
