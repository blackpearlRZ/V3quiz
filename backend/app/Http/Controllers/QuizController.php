<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index()
{
    try {
        return response()->json([
            'quizzes' => Quiz::with(['questions' => function($query) {
                $query->select('id', 'quiz_id', /* other needed fields */);
            }])->withCount('questions')->get()
        ]);
    } catch (\Exception $e) {
        \Log::error($e);
        return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
    }
}

   public function getByLangage($langage)
{
    try {
        $validLanguages = ['html', 'css', 'javascript', 'python', 'react', 'php'];

        if (!in_array($langage, $validLanguages)) {
            return response()->json(['error' => 'Langage non reconnu.'], 400);
        }

        $quizzes = Quiz::where('langage', $langage)
                       ->with(['questions.reponses'])
                       ->withCount('questions')
                       ->get();

        return response()->json(['quizzes' => $quizzes]);
    } catch (\Exception $e) {
        \Log::error($e->getMessage());
        return response()->json(['error' => 'Erreur du serveur'], 500);
    }
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'langauage' => 'required|string|max:50',
            'niveau' => 'required|string|max:50',
            'tempsLimite' => 'required|integer|min:1',
        ]);

        $quiz = Quiz::create($validated);
        return response()->json($quiz, 201);
    }

    public function show($id)
    {
        $quiz = Quiz::with(['questions.reponses'])->find($id);

        if (!$quiz) {
            return response()->json(['error' => 'Quiz non trouvé'], 404);
        }

        return response()->json($quiz);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'langauage' => 'sometimes|required|string|max:50',
            'niveau' => 'sometimes|required|string|max:50',
            'tempsLimite' => 'sometimes|required|integer|min:1',
        ]);

        $quiz->update($validated);
        return response()->json($quiz);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json(null, 204);
    }
}