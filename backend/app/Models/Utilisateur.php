<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email','motDePasse', 'motDePasseHash', 'dateInscription', 'statut'];

    
}
