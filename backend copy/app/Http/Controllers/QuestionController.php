<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    
    public function index()
    {
        $questions = Question::with('quiz')->get();
        return response()->json($questions);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'enonce' => 'required|string',
            'type' => 'required|string',
            'points' => 'required|integer|min:1',
        ]);

        $question = Question::create($validated);
        return response()->json($question, 201);
    }

    
    public function show(Question $question)
    {
        return response()->json($question->load('quiz'));
    }

    
    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'quiz_id' => 'sometimes|required|exists:quizzes,id',
            'enonce' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|in:multiple_choice,single_choice,true_false,open_ended',
            'points' => 'sometimes|required|integer|min:1',
        ]);

        $question->update($validated);
        return response()->json($question);
    }

    
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json(null, 204);
    }
}