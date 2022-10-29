<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        
        $this->call([
            CompanySeeder::class,
            RoleSeeder::class,
            PeopleSeeder::class,
            AdminSeeder::class,
            RecruiterSeeder::class,
            JobseekerSeeder::class,
            AdvertisementsSeeder::class,
            MailSeeder::class,
            ApplySeeder::class
        ]);
    }
}
