<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run()
    {
        $quizzes = [
            [
                'titre' => 'HTML Basics',
                'langage' => 'html',
                'niveau' => 'beginner',
                'tempsLimite' => 10,
            ],
            [
                'titre' => 'HTML Advanced',
                'langage' => 'html',
                'niveau' => 'intermediate',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'CSS Fundamentals',
                'langage' => 'css',
                'niveau' => 'beginner',
                'tempsLimite' => 15,
            ],
            [
                'titre' => 'JavaScript ES6',
                'langage' => 'javascript',
                'niveau' => 'intermediate',
                'tempsLimite' => 25,
            ],
            [
                'titre' => 'React Hooks',
                'langage' => 'react',
                'niveau' => 'advanced',
                'tempsLimite' => 30,
            ],
            [
                'titre' => 'Python OOP',
                'langage' => 'python',
                'niveau' => 'intermediate',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'PHP Basics',
                'langage' => 'php',
                'niveau' => 'beginner',
                'tempsLimite' => 15,
            ],
        ];

        foreach ($quizzes as $quiz) {
            Quiz::create($quiz);
        }
    }
}