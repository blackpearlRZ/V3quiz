<?php

namespace Database\Seeders;

use App\Models\Statistique;
use Illuminate\Database\Seeder;

class StatistiqueSeeder extends Seeder
{
    public function run()
    {
        $stats = [
            [
                'utilisateur_id' => 1,  // Assuming user with ID 1 exists
                'langage' => 'html',
                'reussiteMoyenne' => 75.5,
                'tempsMoyen' => 120,
            ],
            [
                'utilisateur_id' => 1,
                'langage' => 'css',
                'reussiteMoyenne' => 82.3,
                'tempsMoyen' => 95,
            ],
        ];

        foreach ($stats as $stat) {
            Statistique::create($stat);
        }
    }
}