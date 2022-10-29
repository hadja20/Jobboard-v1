<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Apply;

class ApplySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $applies=[
            "id"=>1,
            "advertisement_id"=>1,
            "mail_id"=>1,
            "jobseeker_id"=>1
        ];

        Apply::insert($applies);
    }
}
