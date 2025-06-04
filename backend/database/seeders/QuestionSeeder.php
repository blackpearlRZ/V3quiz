<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run()
    {
        $questions = [
            // HTML Basics (quiz_id = 1)
            [
                'quiz_id' => 1,
                'enonce' => 'What does HTML stand for?',
                'type' => 'single_choice',
                'points' => 1,
            ],
            [
                'quiz_id' => 1,
                'enonce' => 'Which tag is used for a paragraph?',
                'type' => 'single_choice',
                'points' => 1,
            ],
            // CSS Fundamentals (quiz_id = 3)
            [
                'quiz_id' => 3,
                'enonce' => 'What does CSS stand for?',
                'type' => 'single_choice',
                'points' => 1,
            ],
            [
                'quiz_id' => 3,
                'enonce' => 'Which property changes text color?',
                'type' => 'single_choice',
                'points' => 1,
            ],
        ];

        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}