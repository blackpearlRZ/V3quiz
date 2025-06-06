<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'langauage', 'niveau', 'tempsLimite'
    ];

     public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

}
