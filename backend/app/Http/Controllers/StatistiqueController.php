<?php

namespace App\Http\Controllers;

use App\Models\Statistique;
use App\Models\User;
use Illuminate\Http\Request;

class StatistiqueController extends Controller
{
    
    public function index()
    {
        $statistiques = Statistique::with('user')->get();
        return response()->json($statistiques);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:users,id',
            'langage' => 'required|string|max:50',
            'reussiteMoyenne' => 'required|numeric|between:0,100',
            'tempsMoyen' => 'required|integer|min:0', 
        ]);

        $statistique = Statistique::create($validated);
        return response()->json($statistique, 201);
    }

    
    public function show(Statistique $statistique)
    {
        return response()->json($statistique->load(['user', 'questions', 'reponses']));
    }

    
    public function update(Request $request, Statistique $statistique)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'sometimes|required|exists:users,id',
            'langage' => 'sometimes|required|string|max:50',
            'reussiteMoyenne' => 'sometimes|required|numeric|between:0,100',
            'tempsMoyen' => 'sometimes|required|integer|min:0',
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