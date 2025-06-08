<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run()
    {
        $quizzes = [
            // HTML (3)
            [
                'titre' => 'HTML Fondamentaux',
                'langage' => 'html',
                'niveau' => 'débutant',
                'tempsLimite' => 15,
            ],
            [
                'titre' => 'HTML Intermédiaire',
                'langage' => 'html',
                'niveau' => 'intermédiaire',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'HTML5 Avancé',
                'langage' => 'html',
                'niveau' => 'avancé',
                'tempsLimite' => 25,
            ],
            
            // CSS (3)
            [
                'titre' => 'CSS de Base',
                'langage' => 'css',
                'niveau' => 'débutant',
                'tempsLimite' => 15,
            ],
            [
                'titre' => 'CSS Flexbox/Grid',
                'langage' => 'css',
                'niveau' => 'intermédiaire',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'Animations CSS',
                'langage' => 'css',
                'niveau' => 'avancé',
                'tempsLimite' => 25,
            ],
            
            // JavaScript (3)
            [
                'titre' => 'JavaScript Essentiel',
                'langage' => 'javascript',
                'niveau' => 'débutant',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'ES6+ Moderne',
                'langage' => 'javascript',
                'niveau' => 'intermédiaire',
                'tempsLimite' => 25,
            ],
            [
                'titre' => 'JS Avancé',
                'langage' => 'javascript',
                'niveau' => 'avancé',
                'tempsLimite' => 30,
            ],
            
            // PHP (3)
            [
                'titre' => 'PHP Débutant',
                'langage' => 'php',
                'niveau' => 'débutant',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'POO en PHP',
                'langage' => 'php',
                'niveau' => 'intermédiaire',
                'tempsLimite' => 25,
            ],
            [
                'titre' => 'Laravel Basics',
                'langage' => 'php',
                'niveau' => 'avancé',
                'tempsLimite' => 30,
            ],
            
            // Python (3)
            [
                'titre' => 'Python Intro',
                'langage' => 'python',
                'niveau' => 'débutant',
                'tempsLimite' => 20,
            ],
            [
                'titre' => 'Structures Python',
                'langage' => 'python',
                'niveau' => 'intermédiaire',
                'tempsLimite' => 25,
            ],
            [
                'titre' => 'Python Expert',
                'langage' => 'python',
                'niveau' => 'avancé',
                'tempsLimite' => 30,
            ],
        ];

        foreach ($quizzes as $quiz) {
            Quiz::create($quiz);
        }
    }
}