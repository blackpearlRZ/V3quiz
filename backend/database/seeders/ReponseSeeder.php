<?php

namespace Database\Seeders;

use App\Models\Reponse;
use Illuminate\Database\Seeder;

class ReponseSeeder extends Seeder
{
    public function run()
    {
        $reponses = [
            // Question 1 (What does HTML stand for?)
            [
                'question_id' => 1,
                'texte' => 'Hyper Text Markup Language',
                'estCorrecte' => true,
            ],
            [
                'question_id' => 1,
                'texte' => 'Home Tool Markup Language',
                'estCorrecte' => false,
            ],
            // Question 2 (Which tag is used for a paragraph?)
            [
                'question_id' => 2,
                'texte' => '<p>',
                'estCorrecte' => true,
            ],
            [
                'question_id' => 2,
                'texte' => '<para>',
                'estCorrecte' => false,
            ],
            // Question 3 (What does CSS stand for?)
            [
                'question_id' => 3,
                'texte' => 'Cascading Style Sheets',
                'estCorrecte' => true,
            ],
            [
                'question_id' => 3,
                'texte' => 'Computer Style Sheets',
                'estCorrecte' => false,
            ],
        ];

        foreach ($reponses as $reponse) {
            Reponse::create($reponse);
        }
    }
}