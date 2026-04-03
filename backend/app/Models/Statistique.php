<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use App\Models\Reponses;
use App\Models\Quiz;
use App\Models\Utilisateur;

class Statistique extends Model
{
    use HasFactory;
    protected $fillable = [
        'utilisateur_id','quiz_id', 'langage', 'reussiteMoyenne', 'tempsMoyen' ,'total_questions',
    'questions_correctes', 'temps_total'
    ];

    public function utilisateur(){
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }
    
    public function quiz(){
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }

}
