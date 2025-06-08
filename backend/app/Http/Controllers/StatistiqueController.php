<?php

namespace App\Http\Controllers;

use App\Models\Statistique;
use App\Models\User;
use Illuminate\Http\Request;

class StatistiqueController extends Controller
{
    
    public function index()
    {
        $statistiques = Statistique::with('utilisateur')->get();
        return response()->json($statistiques);
    }

    
    public function store(Request $request)
{
    $validated = $request->validate([
        'utilisateur_id' => 'required|exists:utilisateurs,id',
        'quiz_id' => 'required|exists:quizzes,id',
        'langage' => 'required|string|max:50',
        'reussiteMoyenne' => 'required|numeric|between:0,100',
        'tempsMoyen' => 'required|integer|min:0',
        'total_questions' => 'required|integer|min:1',
        'questions_correctes' => 'required|integer|min:0',
        'temps_total' => 'required|integer|min:0' // Changed min to 0
    ]);

    try {
        $statistique = Statistique::create($validated);
        return response()->json($statistique, 201);
    } catch (\Exception $e) {
        \Log::error('Failed to save statistics: '.$e->getMessage());
        return response()->json([
            'message' => 'Failed to save statistics',
            'error' => $e->getMessage()
        ], 500);
    }
}

// Update show method to match your relationships
        public function show(Statistique $statistique)
        {
            return response()->json($statistique->load(['utilisateur', 'quiz']));
        }

    
    public function update(Request $request, Statistique $statistique)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'quiz_id' => 'required|exists:quizzes,id',
            'langage' => 'required|string|max:50',
            'reussiteMoyenne' => 'required|numeric|between:0,100',
            'tempsMoyen' => 'required|integer|min:0',
            'total_questions' => 'required|integer|min:1',
            'questions_correctes' => 'required|integer|min:0',
            'temps_total' => 'required|integer|min:1'
        ]);

        $statistique->update($validated);
        return response()->json($statistique);
    }

    
    public function destroy(Statistique $statistique)
    {
        $statistique->delete();
        return response()->json(null, 204);
    }

    
    public function getByUser($userId)
    {
        $user = User::findOrFail($userId);
        $statistiques = $user->statistiques;
        return response()->json($statistiques);
    }

    
    public function getByLanguage($language)
    {
        $statistiques = Statistique::where('langage', $language)->get();
        return response()->json($statistiques);
    }

}