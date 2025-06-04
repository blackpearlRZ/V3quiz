<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use App\Models\Reponses;

class Statistique extends Model
{
    use HasFactory;
    protected $fillable = [
        'utilisateur_id', 'langage', 'reussiteMoyenne', 'tempsMoyen' 
    ];
    
    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function reponses(){
        return $this->hasMany(Reponse::class);
    }

}
