<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Statistique;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom', 'prenom', 'email', 'motDePasseHash',
    ];

    protected $hidden = [
        'motDePasseHash',
    ];

    public function getAuthPassword()
    {
        return $this->motDePasseHash;
    }

    public function statistiques(){
        return $this->hasMnay(Statistique::class, 'utilisateur_id');
    }
}
