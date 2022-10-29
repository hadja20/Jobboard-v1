<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Advertisement;
class AdvertisementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $advertisements=[ [
            'id'=>1,
            'title'=>'Data Analyst',
            'postcode'=>'34000',
            'description'=>"Data Analyst",
            'city'=>'MONTPELLIER',
            'contract'=>'CDI',
            'salary'=>3000,
            'places'=>1,
            'recruiter_id'=>2        
            ],
            [
                'id'=>2,
                'title'=>'Assistant RH',
                'postcode'=>'34000',
                'description'=>"Profil recherché bac+3 minimum",
                'city'=>'MONTPELLIER',
                'contract'=>'CDI',
                'salary'=>1700,
                'places'=>1,
                'recruiter_id'=>  5    
            ],

            [
                'id'=>3,
                'title'=>'Caissier H/F',
                'postcode'=>'34000',
                'description'=>"Rayon et caisse",
                'city'=>'MONTPELLIER',
                'contract'=>'CDI',
                'salary'=>1200,
                'places'=>1,
                'recruiter_id'=>  6
            ],[
                'id'=>4,
                'title'=>'Developpeur web H/F',
                'postcode'=>'34000',
                'description'=>"Bac+3 minimum",
                'city'=>'MONTPELLIER',
                'contract'=>'Alternance',
                'salary'=>1000,
                'places'=>1,
                'recruiter_id'=> 1


            ]
];
        
        Advertisement::insert($advertisements);
    }
}
