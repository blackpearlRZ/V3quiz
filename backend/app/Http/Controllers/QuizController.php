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
            'quizzes' => Quiz::all() // Ensure Quiz model exists
        ]);
    } catch (\Exception $e) {
        \Log::error($e); // Check storage/logs/laravel.log
        return response()->json(['error' => 'Server error'],500);}
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



    public function show(Quiz $quiz)
    {
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