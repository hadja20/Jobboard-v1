<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Person;

class PeopleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $people=[ [
            'id' => 1,
            'firstName' => "admin",
            'lastName'=>"numéro un",
            'email'=>'admin1@mail.com',
            'password'=> bcrypt('bidule123'),
            'role_id'=>1
        ],
        [
            'id' => 2,
            'firstName' => "recruteur",
            'lastName'=>"numéro un",
            'email'=>'testrecruteur@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],
        [
            'id' => 3,
            'firstName' => "rechercheur ",
            'lastName'=>"numéro un",
            'email'=>'rechercheur1@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>3
        ],
        [
            'id' =>4,
            'firstName' => "recruteur",
            'lastName'=>"numéro deux",
            'email'=>'testrecruteur2@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],
        [
            'id' => 5,
            'firstName' => "recruteur",
            'lastName'=>"numéro trois",
            'email'=>'testrecruteur3@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],
        [
            'id' => 6,
            'firstName' => "recruteur",
            'lastName'=>"numéro quatre",
            'email'=>'testrecruteur4@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],
        [
            'id' => 7,
            'firstName' => "recruteur",
            'lastName'=>"numéro cinq",
            'email'=>'testrecruteur5@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],
        [
            'id' => 8,
            'firstName' => "recruteur",
            'lastName'=>"numéro six",
            'email'=>'testrecruteur6@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],


        [
            'id' => 9,
            'firstName' => "recruteur",
            'lastName'=>"numéro sept",
            'email'=>'testrecruteur7@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ],
        [
            'id' => 10,
            'firstName' => "recruteur",
            'lastName'=>"numéro huit",
            'email'=>'testrecruteur8@mail.com',
            'password'=>bcrypt('bidule123'),
            'role_id'=>2
        ]];

      Person::insert($people);
    }
}
