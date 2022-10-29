<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Jobseeker;
class JobseekerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $jobseekers=[   [
        'id'=>1,
        'bio'=>"A la recherche d'un emploi",
        'phone'=>"0689765434",
        "person_id"=>3
    ]];

    Jobseeker::insert($jobseekers);

    }
}
