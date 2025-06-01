<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;

class Reponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id', 'texte', 'estCorrecte'
    ];

    public function question(){
        return $this->belongsTo(Question::class);
    }

}
