<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles=[  [
            'id' => 1,
            'name' => "admin"
        ],
        [
            'id' => 2,
            'name' => "recruiter"
        ],
        [
            'id' => 3,
            'name' => "jobseeker"
        ],];
       
        Role::insert($roles);
    }
}
