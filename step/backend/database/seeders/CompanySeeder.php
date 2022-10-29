<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()

    {
        $companies=[ [
            'id'=>1,
            'name' => "Atos",
            'website' => "www.atos.fr",
            'description' => "description atos",
            'logo' => 'atos.png'
        ],

        [
            'id'=>2,
            'name' => "Auchan",
            'website' => "www.auchan.fr",
            'description' => "description auchan",
            'logo' => 'auchan.png'
        ],
        [
            'id'=>3,
            'name' => "Société Générale",
            'website' => "www.société-générale.fr",
            'description' => "description société général",
            'logo' => 'logo-societe-generale.png'
        ],
        [
            'id'=>4,
            'name' => "Intermarché",
            'website' => "www.intermarché.fr",
            'description' => "description intermarché",
            'logo' => 'intermarché.jpg'
        ],
      
        [
            'id'=>5,
            'name' => "LIDL",
            'website' => "www.lidl.fr",
            'description' => "description lidl",
            'logo' => 'lidl.jpg'
        ],
        [
            'id'=>6,
            'name' => "Jobee",
            'website' => "www.jobee.fr",
            'description' => "description jobee",
            'logo' => 'logo.png'
        ],
        [
            'id'=>7,
            'name' => "Crédit Agricole",
            'website' => "www.ca.fr",
            'description' => "description crédit agricol",
            'logo' => 'credit-agricole.svg'
        ],
        [
            'id'=>8,
            'name' => "Géant Casino",
            'website' => "www.géant-casino.fr",
            'description' => "description géant casino",
            'logo' => 'Géant_Casino.svg.png'
        ]];
      
        Company::insert($companies);
    }
}
