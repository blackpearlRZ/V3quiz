<?php

namespace Database\Seeders;

use App\Models\Reponse;
use Illuminate\Database\Seeder;

class ReponseSeeder extends Seeder
{
    public function run()
    {
        $reponses = [];
        $questionCount = 150; 
        
        for ($questionId = 1; $questionId <= $questionCount; $questionId++) {
            $quizId = ceil($questionId / 10);
            $langage = $this->getLangage($quizId);
            $niveau = $this->getNiveau($quizId);
            $questionNum = ($questionId-1) % 10 + 1;
            
            // Get the correct answers for this question
            $correctAnswers = $this->getCorrectAnswers($langage, $niveau, $questionNum);
            $wrongAnswers = $this->getWrongAnswers($langage, $niveau, $questionNum);
            
            // Shuffle the wrong answers and pick 3
            shuffle($wrongAnswers);
            $selectedWrongAnswers = array_slice($wrongAnswers, 0, 3);
            
            // Combine correct and wrong answers
            $allAnswers = array_merge([$correctAnswers[0]], $selectedWrongAnswers);
            
            // Shuffle all answers to randomize position
            shuffle($allAnswers);
            
            // Find the index of the correct answer after shuffling
            $correctIndex = array_search($correctAnswers[0], $allAnswers);
            
            for ($i = 0; $i < 4; $i++) {
                $reponses[] = [
                    'question_id' => $questionId,
                    'texte' => $allAnswers[$i],
                    'estCorrecte' => ($i === $correctIndex),
                ];
            }
        }

        foreach ($reponses as $reponse) {
            Reponse::create($reponse);
        }
    }

    private function getCorrectAnswers($langage, $niveau, $questionNum)
    {
        $answers = [
            'html' => [
                'débutant' => [
                    1 => ["Hyper Text Markup Language"],
                    2 => ["<h1>"],
                    3 => ["<a>"],
                    4 => ["href"],
                    5 => ["<img>"],
                    6 => ["<ul>"],
                    7 => ["En bas de body"],
                    8 => ["<br>"],
                    9 => ["alt"],
                    10 => ["<form>"]
                ],
                'intermédiaire' => [
                    1 => ["<main>"],
                    2 => ["required"],
                    3 => ["<video>"],
                    4 => ["<footer>"],
                    5 => ["<textarea>"],
                    6 => ["<blockquote>"],
                    7 => ["tabindex"],
                    8 => ["<select>"],
                    9 => ["<code>"],
                    10 => ["<progress>"]
                ],
                'avancé' => [
                    1 => ["<canvas>"],
                    2 => ["localStorage"],
                    3 => ["pattern"],
                    4 => ["<svg>"],
                    5 => ["<meta>"],
                    6 => ["draggable='true'"],
                    7 => ["navigator.geolocation"],
                    8 => ["loading='lazy'"],
                    9 => ["<details>"],
                    10 => ["Service Workers"]
                ]
            ],
            'css' => [
                'débutant' => [
                    1 => ["Cascading Style Sheets"],
                    2 => ["#id"],
                    3 => ["color"],
                    4 => ["text-align: center"],
                    5 => ["em"],
                    6 => ["font-weight: bold"],
                    7 => ["list-style-type"],
                    8 => ["margin"],
                    9 => ["*"],
                    10 => [".class1, .class2"]
                ],
                'intermédiaire' => [
                    1 => ["display: flex"],
                    2 => ["animation"],
                    3 => ["--variable-name"],
                    4 => ["Padding est à l'intérieur, margin à l'extérieur"],
                    5 => [":hover"],
                    6 => ["Contenu + padding + border + margin"],
                    7 => ["Media queries"],
                    8 => ["Ordre d'application des règles CSS"],
                    9 => ["Alignement vertical des éléments en ligne"],
                    10 => ["linear-gradient()"]
                ],
                'avancé' => [
                    1 => ["@keyframes"],
                    2 => ["Block Element Modifier"],
                    3 => ["display: grid"],
                    4 => ["Préprocesseur CSS"],
                    5 => ["Toutes ces réponses"],
                    6 => ["Règles conditionnelles pour les devices"],
                    7 => ["transition"],
                    8 => ["Ordre d'empilement"],
                    9 => ["mask-image"],
                    10 => ["Variables CSS personnalisées"]
                ]
            ],
            'javascript' => [
                'débutant' => [
                    1 => ["let x = 5;"],
                    2 => ["==="],
                    3 => ["function maFonction() {}"],
                    4 => ["console.log()"],
                    5 => ["for (let i = 0; i < 5; i++)"],
                    6 => ["Document Object Model"],
                    7 => ["document.querySelector()"],
                    8 => ["addEventListener()"],
                    9 => ["let arr = [];"],
                    10 => ["Fonction passée en argument"]
                ],
                'intermédiaire' => [
                    1 => ["Fonction avec accès à son scope parent"],
                    2 => ["Transforme chaque élément"],
                    3 => ["let a un scope de bloc"],
                    4 => ["Remontée des déclarations"],
                    5 => ["XMLHttpRequest"],
                    6 => ["Opération asynchrone"],
                    7 => ["Syntaxe pour les promesses"],
                    8 => ["...arr"],
                    9 => ["const {x} = obj"],
                    10 => ["Contexte d'exécution"]
                ],
                'avancé' => [
                    1 => ["Thread en arrière-plan"],
                    2 => ["Intercepter les opérations sur objets"],
                    3 => ["Gestion de l'asynchrone"],
                    4 => ["Toutes ces réponses"],
                    5 => ["Libération mémoire inutilisée"],
                    6 => ["Fonction qui peut être suspendue"],
                    7 => ["DOM isolé"],
                    8 => ["Mise en cache des résultats"],
                    9 => ["Système d'héritage"],
                    10 => ["Clés d'objet faibles"]
                ]
            ],
            'php' => [
                'débutant' => [
                    1 => ["<?php"],
                    2 => ["echo"],
                    3 => ["\$variable"],
                    4 => ["\$arr = [];"],
                    5 => ["for (\$i = 0; \$i < 5; \$i++)"],
                    6 => ["function maFonction() {}"],
                    7 => ["\$_GET"],
                    8 => ["include"],
                    9 => ["class MaClass {}"],
                    10 => ["try/catch"]
                ],
                'intermédiaire' => [
                    1 => ["Stockage côté serveur"],
                    2 => ["mysqli_connect()"],
                    3 => ["Interface pour bases de données"],
                    4 => ["Gestionnaire de paquets"],
                    5 => ["Chargement automatique des classes"],
                    6 => ["namespace Mon\\Espace;"],
                    7 => ["Mécanisme de réutilisation de code"],
                    8 => ["Gestion des erreurs critiques"],
                    9 => ["Contrat pour les classes"],
                    10 => [".htaccess"]
                ],
                'avancé' => [
                    1 => ["Inversion de contrôle"],
                    2 => ["Classe avec une responsabilité unique"],
                    3 => ["Couche de traitement de requête"],
                    4 => ["Toutes ces réponses"],
                    5 => ["Toutes ces réponses"],
                    6 => ["Toutes ces réponses"],
                    7 => ["Système pub/sub"],
                    8 => ["Toutes ces réponses"],
                    9 => ["Toutes ces réponses"],
                    10 => ["Toutes ces réponses"]
                ]
            ],
            'python' => [
                'débutant' => [
                    1 => ["print()"],
                    2 => ["x = 5"],
                    3 => ["if condition:"],
                    4 => ["for i in range(5):"],
                    5 => ["def ma_fonction():"],
                    6 => ["ma_liste = []"],
                    7 => ["with open()"],
                    8 => ["try/except"],
                    9 => ["mon_dict = {}"],
                    10 => ["import module"]
                ],
                'intermédiaire' => [
                    1 => ["[x for x in range(10)]"],
                    2 => ["@decorator"],
                    3 => ["Fonction avec yield"],
                    4 => ["map(function, iterable)"],
                    5 => ["a, *rest = [1,2,3]"],
                    6 => ["with open() as f:"],
                    7 => ["f-strings"],
                    8 => ["liste[debut:fin]"],
                    9 => ["Combine des itérables"],
                    10 => ["lambda x: x*2"]
                ],
                'avancé' => [
                    1 => ["Global Interpreter Lock"],
                    2 => ["Bibliothèque asynchrone"],
                    3 => ["Classes de classes"],
                    4 => ["match/case"],
                    5 => ["Protocole d'accès attribut"],
                    6 => ["Toutes ces réponses"],
                    7 => ["Fonctions asynchrones"],
                    8 => ["Type hints"],
                    9 => ["Abstract Base Class"],
                    10 => ["Toutes ces réponses"]
                ]
            ]
        ];
        
        return $answers[$langage][$niveau][$questionNum] ?? ["Réponse correcte"];
    }
    
    private function getWrongAnswers($langage, $niveau, $questionNum)
    {
        $wrongAnswers = [
            'html' => [
                'débutant' => [
                    1 => ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
                    2 => ["<head>", "<header>", "<title>"],
                    3 => ["<link>", "<href>", "<hyperlink>"],
                    4 => ["src", "link", "url"],
                    5 => ["<image>", "<picture>", "<src>"],
                    6 => ["<ol>", "<li>", "<list>"],
                    7 => ["Dans head", "N'importe où", "Dans un div spécial"],
                    8 => ["<lb>", "<break>", "<newline>"],
                    9 => ["title", "description", "src-alt"],
                    10 => ["<input>", "<submit>", "<fieldset>"]
                ],
                'intermédiaire' => [
                    1 => ["<content>", "<body>", "<section>"],
                    2 => ["mandatory", "necessary", "validate"],
                    3 => ["<media>", "<movie>", "<play>"],
                    4 => ["<bottom>", "<end>", "<foot>"],
                    5 => ["<text>", "<input type='multiline'>", "<paragraph>"],
                    6 => ["<quote>", "<cite>", "<q>"],
                    7 => ["order", "focus", "sequence"],
                    8 => ["<dropdown>", "<options>", "<menu>"],
                    9 => ["<script>", "<pre>", "<kbd>"],
                    10 => ["<meter>", "<load>", "<status>"]
                ],
                'avancé' => [
                    1 => ["<draw>", "<svg>", "<paint>"],
                    2 => ["clientStorage", "browserStorage", "cookieStorage"],
                    3 => ["validate", "regex", "check"],
                    4 => ["<vector>", "<graphic>", "<draw>"],
                    5 => ["<info>", "<head>", "<data>"],
                    6 => ["movable='true'", "drag='enable'", "move='allow'"],
                    7 => ["window.location", "browser.position", "geo.getLocation"],
                    8 => ["load='defer'", "defer='true'", "lazy='true'"],
                    9 => ["<expand>", "<showhide>", "<toggle>"],
                    10 => ["AppCache", "OfflineAPI", "CacheStorage"]
                ]
            ],
            'css' => [
                'débutant' => [
                    1 => ["Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
                    2 => [".id", "*id", "@id"],
                    3 => ["text-color", "font-color", "text-style"],
                    4 => ["align: center", "center: true", "horizontal-align: middle"],
                    5 => ["px", "pt", "vw"],
                    6 => ["text-style: bold", "bold: true", "weight: heavy"],
                    7 => ["list-type", "bullet-style", "marker-type"],
                    8 => ["padding", "spacing", "outer-gap"],
                    9 => ["all", "element", "any"],
                    10 => [".class1 .class2", ".class1 + .class2", ".class1 > .class2"]
                ],
                'intermédiaire' => [
                    1 => ["layout: flex", "display: grid", "flex: true"],
                    2 => ["transition", "transform", "keyframe"],
                    3 => ["\$variable-name", "@variable-name", "var(variable-name)"],
                    4 => ["Padding est pour le texte, margin pour les blocs", "Padding est vertical, margin horizontal", "Aucune différence"],
                    5 => ["onhover", "mouseover", "hover()"],
                    6 => ["Contenu + margin", "Contenu + padding", "Seulement le contenu"],
                    7 => ["Flexbox", "CSS Grid", "Responsive units"],
                    8 => ["Qualité du code", "Performance du rendu", "Compatibilité navigateur"],
                    9 => ["Espacement entre lignes", "Position absolue", "Marge automatique"],
                    10 => ["gradient()", "color-gradient()", "background-gradient()"]
                ],
                'avancé' => [
                    1 => ["animation-sequence", "animate()", "keyframe()"],
                    2 => ["Better Element Management", "Basic Element Model", "Block Enhancement Method"],
                    3 => ["layout: grid", "grid-template", "display: flex-grid"],
                    4 => ["Framework CSS", "Méthodologie", "Bibliothèque JavaScript"],
                    5 => ["Minification", "Utiliser moins de sélecteurs", "Éviter les !important"],
                    6 => ["Sélecteurs avancés", "Variables CSS", "Mixins"],
                    7 => ["transform", "animation", "translate"],
                    8 => ["Profondeur de champ", "Index de performance", "Priorité de rendu"],
                    9 => ["clip-path", "visibility", "opacity"],
                    10 => ["Propriétés expérimentales", "Extensions navigateur", "Polices personnalisées"]
                ]
            ],
            'javascript' => [
                'débutant' => [
                    1 => ["var x = 5;", "x = 5;", "variable x = 5;"],
                    2 => ["==", "=", "!=="],
                    3 => ["function() {}", "() => {}", "def function() {}"],
                    4 => ["alert()", "print()", "log()"],
                    5 => ["while(i < 5)", "for i in range(5)", "loop(i = 0; i < 5; i++)"],
                    6 => ["Data Object Model", "Display Object Manager", "Document Orientation Mode"],
                    7 => ["getElementById()", "findElement()", "selectElement()"],
                    8 => ["onClick()", "listen()", "attach()"],
                    9 => ["new Array()", "array()", "[];"],
                    10 => ["Fonction anonyme", "Fonction récursive", "Fonction fléchée"]
                ],
                'intermédiaire' => [
                    1 => ["Fonction anonyme", "Fonction auto-exécutée", "Fonction génératrice"],
                    2 => ["Filtre les éléments", "Exécute une fonction", "Concatène les tableaux"],
                    3 => ["let est plus rapide", "var est obsolète", "Aucune différence"],
                    4 => ["Optimisation du code", "Compilation anticipée", "Gestion de la mémoire"],
                    5 => ["fetch()", "request()", "ajax()"],
                    6 => ["Fonction anonyme", "Boucle infinie", "Type de données"],
                    7 => ["Alternative aux callbacks", "Méthode de débogage", "Type de fonction"],
                    8 => ["::arr", "%%arr", "->arr"],
                    9 => ["const x = obj[x]", "const x = obj.x", "const x = obj->x"],
                    10 => ["Mot-clé réservé", "Référence à la fonction", "Variable globale"]
                ],
                'avancé' => [
                    1 => ["Web Component", "API de stockage", "Méthode de débogage"],
                    2 => ["Nouvelles structures de données", "Méthodes de tableau", "Système de proxy réseau"],
                    3 => ["Compilation du code", "Ordre d'exécution", "Gestion de la mémoire"],
                    4 => ["Éviter les reflows", "Minifier le code", "Utiliser Web Workers"],
                    5 => ["Collection de données", "Compression des variables", "Optimisation du cache"],
                    6 => ["Fonction anonyme", "Fonction récursive", "Fonction fléchée"],
                    7 => ["Méthode de sélection", "API de stockage", "Technique d'animation"],
                    8 => ["Optimisation des boucles", "Compression des données", "Minification du code"],
                    9 => ["Méthode de clonage", "Pattern de création", "Interface utilisateur"],
                    10 => ["Tableaux associatifs", "Structures immuables", "Collections ordonnées"]
                ]
            ],
            'php' => [
                'débutant' => [
                    1 => ["<?", "<php>", "<?php>"],
                    2 => ["print", "display", "show"],
                    3 => ["var variable", "variable", "@variable"],
                    4 => ["array()", "new Array()", "{};"],
                    5 => ["loop()", "foreach()", "while()"],
                    6 => ["fn()", "function()", "def()"],
                    7 => ["\$GET", "\$_REQUEST", "\$request"],
                    8 => ["require", "import", "use"],
                    9 => ["object", "new class", "def class"],
                    10 => ["catch()", "on error", "handle"]
                ],
                'intermédiaire' => [
                    1 => ["Cookie amélioré", "Variable globale", "Système de cache"],
                    2 => ["db_connect()", "sql_connect()", "connect_mysql()"],
                    3 => ["ORM intégré", "Langage de requête", "Système de migration"],
                    4 => ["Framework PHP", "Préprocesseur", "Système de template"],
                    5 => ["Optimisation de performance", "Compression de code", "Gestion des dépendances"],
                    6 => ["use", "package", "module"],
                    7 => ["Type d'interface", "Méthode magique", "Système d'annotation"],
                    8 => ["Validation de formulaire", "Journalisation", "Sécurité"],
                    9 => ["Type de classe abstraite", "Système de template", "Format de données"],
                    10 => ["Router class", "Route::get()", "map_route()"]
                ],
                'avancé' => [
                    1 => ["Injection SQL", "Pattern de création", "Système de cache"],
                    2 => ["Méthode statique", "Singleton", "Classe helper"],
                    3 => ["Système de template", "Interface de base de données", "Gestionnaire de session"],
                    4 => ["OPcache", "APCu", "Memcached"],
                    5 => ["Solutions réutilisables", "Best practices", "Structures de code"],
                    6 => ["Redis", "Memcached", "APCu"],
                    7 => ["Hooks", "Callbacks globaux", "Signaux"],
                    8 => ["RESTful", "GraphQL", "SOAP"],
                    9 => ["Background jobs", "Tâches asynchrones", "Traitement différé"],
                    10 => ["Validation des entrées", "CSRF protection", "Préparation des requêtes SQL"]
                ]
            ],
            'python' => [
                'débutant' => [
                    1 => ["echo()", "display()", "show()"],
                    2 => ["let x = 5", "var x = 5", "int x = 5"],
                    3 => ["when condition:", "check condition:", "condition ?"],
                    4 => ["for()", "loop()", "while()"],
                    5 => ["function", "func", "meth"],
                    6 => ["list()", "{}", "()"],
                    7 => ["file.open()", "open.file()", "read.file()"],
                    8 => ["try/catch", "on error", "rescue"],
                    9 => ["dict()", "[]", "()"],
                    10 => ["use", "require", "include"]
                ],
                'intermédiaire' => [
                    1 => ["list(range(10))", "for x in range(10): yield x", "x * for x in range(10)"],
                    2 => ["#decorator", "\$decorator", "decorator()"],
                    3 => ["Fonction récursive", "Fonction anonyme", "Fonction imbriquée"],
                    4 => ["iterable.map(function)", "apply(function, iterable)", "function @ iterable"],
                    5 => ["*a = [1,2,3]", "a... = [1,2,3]", "a & rest = [1,2,3]"],
                    6 => ["using open() as f:", "context open() as f:", "open() as f:"],
                    7 => ["str.format()", "% formatting", "template strings"],
                    8 => ["liste.slice()", "liste.substring()", "liste.cut()"],
                    9 => ["Compresse des fichiers", "Crypte des données", "Crée des archives"],
                    10 => ["def (x): return x*2", "function x: x*2", "x => x*2"]
                ],
                'avancé' => [
                    1 => ["General Index Layer", "Garbage Collection", "Graphics Interface"],
                    2 => ["Outil de débogage", "Générateur de code", "Système de cache"],
                    3 => ["Classes abstraites", "Classes anonymes", "Classes dynamiques"],
                    4 => ["switch/case", "pattern/case", "check/case"],
                    5 => ["Méthode magique", "Décorateur avancé", "Interface bas niveau"],
                    6 => ["Utiliser Cython", "Éviter les boucles", "Utiliser des générateurs"],
                    7 => ["Générateurs améliorés", "Threads légers", "Processus parallèles"],
                    8 => ["Documentation", "Validation", "Optimisation"],
                    9 => ["Anonymous Block Class", "Async Base Class", "Attribute Based Class"],
                    10 => ["threading", "asyncio", "multithreading"]
                ]
            ]
        ];
        
        return $wrongAnswers[$langage][$niveau][$questionNum] ?? ["Fausse réponse 1", "Fausse réponse 2", "Fausse réponse 3"];
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
}