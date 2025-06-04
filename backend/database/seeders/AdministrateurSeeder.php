<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdministrateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('administrateurs')->insert( [
            'email' => 'benyoussefmouad1@gmail.com',
            'motDePasse' => Hash::make('mm123'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'email' => 'chaimaeaafif@gmail.com',
            'motDePasse' => Hash::make('ff123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
