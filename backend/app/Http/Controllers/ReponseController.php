<?php

namespace App\Http\Controllers;

use App\Models\Reponse;
use App\Models\Question;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    
    public function index()
    {
        $responses = Reponse::with('question')->get();
        return response()->json($responses);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_id' => 'required|exists:questions,id',
            'texte' => 'required|string',
            'estCorrecte' => 'required|boolean',
        ]);

        $response = Reponse::create($validated);
        return response()->json($response, 201);
    }

    
    public function show(Reponse $reponse)
    {
        return response()->json($reponse->load('question'));
    }

   
    public function update(Request $request, Reponse $reponse)
    {
        $validated = $request->validate([
            'question_id' => 'sometimes|required|exists:questions,id',
            'texte' => 'sometimes|required|string',
            'estCorrecte' => 'sometimes|required|boolean',
        ]);

        $reponse->update($validated);
        return response()->json($reponse);
    }

   
    public function destroy(Reponse $reponse)
    {
        $reponse->delete();
        return response()->json(null, 204);
    }

    
    public function getByQuestion($questionId)
    {
        $question = Question::findOrFail($questionId);
        $responses = $question->reponses;
        return response()->json($responses);
    }
}