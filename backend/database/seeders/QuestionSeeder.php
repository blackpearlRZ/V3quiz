<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run()
    {
        $questions = [];
        
        // Generate 10 questions for each quiz (15 quizzes)
        for ($quizId = 1; $quizId <= 15; $quizId++) {
            $langage = $this->getLangage($quizId);
            $niveau = $this->getNiveau($quizId);
            
            for ($i = 1; $i <= 10; $i++) {
                $questions[] = [
                    'quiz_id' => $quizId,
                    'enonce' => $this->getQuestionText($langage, $niveau, $i),
                    'type' => 'single_choice',
                    'points' => 1,
                ];
            }
        }

        foreach ($questions as $question) {
            Question::create($question);
        }
    }

    private function getLangage($quizId)
    {
        return match((int)ceil($quizId / 3)) {
            1 => 'html',
            2 => 'css',
            3 => 'javascript',
            4 => 'php',
            5 => 'python',
        };
    }

    private function getNiveau($quizId)
    {
        return match($quizId % 3) {
            1 => 'débutant',
            2 => 'intermédiaire',
            0 => 'avancé',
        };
    }

    private function getQuestionText($langage, $niveau, $index)
{
    $questions = [
        'html' => [
            'débutant' => [
                "Que signifie l'acronyme HTML ?",
                "Quelle balise est utilisée pour le titre principal ?",
                "Comment créer un lien hypertexte ?",
                "Quel attribut définit l'URL d'un lien ?",
                "Balise pour insérer une image ?",
                "Comment créer une liste non ordonnée ?",
                "Où place-t-on normalement les balises <script> ?",
                "Balise pour un saut de ligne ?",
                "Attribut pour le texte alternatif d'image ?",
                "Balise pour créer un formulaire ?"
            ],
            'intermédiaire' => [
                "Quelle balise HTML5 définit le contenu principal ?",
                "Attribut pour rendre un champ obligatoire ?",
                "Comment intégrer une vidéo en HTML5 ?",
                "Quelle balise pour le pied de page ?",
                "Comment créer une zone de texte multiligne ?",
                "Quelle balise pour une citation longue ?",
                "Attribut pour définir l'ordre de tabulation ?",
                "Comment créer un menu déroulant ?",
                "Quelle balise pour du code informatique ?",
                "Comment créer une barre de progression ?"
            ],
            'avancé' => [
                "Comment créer un canvas dessinable ?",
                "Quelle API pour le stockage local ?",
                "Attribut pour la validation des formulaires ?",
                "Comment intégrer du SVG directement ?",
                "Quelle balise pour les métadonnées ?",
                "Comment créer une zone déplaçable ?",
                "Quelle API pour la géolocalisation ?",
                "Comment optimiser le chargement des images ?",
                "Quelle balise pour les détails/masquage ?",
                "Comment créer une application hors-ligne ?"
            ]
        ],
        'css' => [
            'débutant' => [
                "Que signifie CSS ?",
                "Comment sélectionner un élément par son id ?",
                "Propriété pour changer la couleur du texte ?",
                "Comment centrer un texte horizontalement ?",
                "Unité relative à la taille de police ?",
                "Comment mettre du texte en gras ?",
                "Propriété pour le style de liste ?",
                "Comment ajouter une marge extérieure ?",
                "Sélecteur pour tous les éléments ?",
                "Comment cibler plusieurs éléments ?"
            ],
            'intermédiaire' => [
                "Comment créer un layout flexible ?",
                "Propriété pour les animations ?",
                "Comment utiliser les variables CSS ?",
                "Différence entre padding et margin ?",
                "Comment créer un effet de survol ?",
                "Qu'est-ce que le modèle de boîte ?",
                "Comment créer un design responsive ?",
                "Qu'est-ce que la spécificité en CSS ?",
                "Comment vertical-align fonctionne ?",
                "Comment créer un dégradé linéaire ?"
            ],
            'avancé' => [
                "Comment créer des animations complexes ?",
                "Qu'est-ce que BEM en CSS ?",
                "Comment utiliser CSS Grid ?",
                "Qu'est-ce que le préprocesseur SASS ?",
                "Comment optimiser les performances CSS ?",
                "Qu'est-ce que les media queries ?",
                "Comment créer des transitions fluides ?",
                "Qu'est-ce que le z-index ?",
                "Comment créer des masques CSS ?",
                "Qu'est-ce que les custom properties ?"
            ]
        ],
        // Continue with other languages...
        'javascript' => [
            'débutant' => [
                "Comment déclarer une variable ?",
                "Quel opérateur pour la comparaison stricte ?",
                "Comment créer une fonction ?",
                "Méthode pour afficher un message ?",
                "Comment créer une boucle ?",
                "Qu'est-ce que le DOM ?",
                "Comment sélectionner un élément ?",
                "Méthode pour ajouter un événement ?",
                "Comment créer un tableau ?",
                "Qu'est-ce qu'une callback ?"
            ],
            'intermédiaire' => [
                "Qu'est-ce qu'une closure ?",
                "Comment utiliser map() ?",
                "Différence entre let et var ?",
                "Qu'est-ce que le hoisting ?",
                "Comment faire une requête AJAX ?",
                "Qu'est-ce qu'une promesse ?",
                "Comment utiliser async/await ?",
                "Qu'est-ce que le spread operator ?",
                "Comment déstructurer un objet ?",
                "Qu'est-ce que le contexte this ?"
            ],
            'avancé' => [
                "Qu'est-ce qu'un Web Worker ?",
                "Comment utiliser les proxies ?",
                "Qu'est-ce que le event loop ?",
                "Comment optimiser les performances ?",
                "Qu'est-ce que le garbage collection ?",
                "Comment utiliser les generators ?",
                "Qu'est-ce que le shadow DOM ?",
                "Comment faire du memoization ?",
                "Qu'est-ce que le prototype ?",
                "Comment utiliser les WeakMaps ?"
            ]
        ],
        'php' => [
            'débutant' => [
                "Comment commencer un script PHP ?",
                "Comment afficher du texte ?",
                "Comment déclarer une variable ?",
                "Comment créer un tableau ?",
                "Comment faire une boucle ?",
                "Comment créer une fonction ?",
                "Comment lire les données GET ?",
                "Comment inclure un fichier ?",
                "Comment créer une classe ?",
                "Comment gérer les erreurs ?"
            ],
            'intermédiaire' => [
                "Qu'est-ce qu'une session ?",
                "Comment se connecter à MySQL ?",
                "Qu'est-ce que PDO ?",
                "Comment utiliser Composer ?",
                "Qu'est-ce que l'autoloading ?",
                "Comment créer un namespace ?",
                "Qu'est-ce que les traits ?",
                "Comment gérer les exceptions ?",
                "Qu'est-ce que les interfaces ?",
                "Comment faire du routing ?"
            ],
            'avancé' => [
                "Qu'est-ce que l'injection de dépendances ?",
                "Comment créer un service ?",
                "Qu'est-ce que Middleware ?",
                "Comment optimiser les performances ?",
                "Qu'est-ce que les design patterns ?",
                "Comment faire du caching ?",
                "Qu'est-ce que les événements ?",
                "Comment créer une API REST ?",
                "Qu'est-ce que les queues ?",
                "Comment sécuriser une application ?"
            ]
        ],
        'python' => [
            'débutant' => [
                "Comment afficher du texte ?",
                "Comment créer une variable ?",
                "Comment faire une condition ?",
                "Comment créer une boucle ?",
                "Comment créer une fonction ?",
                "Comment créer une liste ?",
                "Comment lire un fichier ?",
                "Comment gérer les exceptions ?",
                "Comment créer un dictionnaire ?",
                "Comment importer un module ?"
            ],
            'intermédiaire' => [
                "Qu'est-ce qu'une liste en compréhension ?",
                "Comment utiliser les décorateurs ?",
                "Qu'est-ce qu'un générateur ?",
                "Comment utiliser map() et filter() ?",
                "Qu'est-ce que l'Unpacking ?",
                "Comment utiliser les context managers ?",
                "Qu'est-ce que les f-strings ?",
                "Comment faire du slicing ?",
                "Qu'est-ce que zip() ?",
                "Comment utiliser lambda ?"
            ],
            'avancé' => [
                "Qu'est-ce que le GIL ?",
                "Comment utiliser asyncio ?",
                "Qu'est-ce que les metaclasses ?",
                "Comment faire du pattern matching ?",
                "Qu'est-ce que les descriptors ?",
                "Comment optimiser les performances ?",
                "Qu'est-ce que les coroutines ?",
                "Comment utiliser les annotations ?",
                "Qu'est-ce que ABC ?",
                "Comment faire du multiprocessing ?"
            ]
        ]
    ];

    return $questions[$langage][$niveau][$index-1] ?? "Question {$index} sur {$langage} ({$niveau})";
}
}