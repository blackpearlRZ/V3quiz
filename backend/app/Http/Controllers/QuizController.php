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
                'quizzes' => Quiz::withCount('questions')->get()
            ]);
        } catch (\Exception $e) {
            \Log::error($e);
            return response()->json(['error' => 'Erreur du serveur'], 500);
        }
    }

    public function getByLanguage($langauage)
    {
        try {
            $quizzes = Quiz::where('langage', $langauage)
                          ->withCount('questions')
                          ->get();
            
            return response()->json([
                'quizzes' => $quizzes
            ]);
        } catch (\Exception $e) {
            \Log::error($e);
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
        $quiz = Quiz::find($id);
        return response()->json($quiz->load(['questions', 'questions.reponses']));
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