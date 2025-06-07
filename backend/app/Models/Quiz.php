<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // Add this import

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'langage', 'niveau', 'tempsLimite'
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}