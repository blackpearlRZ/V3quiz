<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use App\Models\Reponses;
use App\Models\Quiz;

class Statistique extends Model
{
    use HasFactory;
    protected $fillable = [
        'utilisateur_id','quiz_id', 'langage', 'reussiteMoyenne', 'tempsMoyen' 
    ];
    
    public function quiz(){
        return $this->belongsTo(Quiz::class);
    }

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function reponses(){
        return $this->hasMany(Reponse::class);
    }

}
