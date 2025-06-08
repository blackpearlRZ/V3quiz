<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('statistiques', function (Blueprint $table) {
            $table->foreignId('utilisateur_id ')->constrained('utilisateurs', 'id');
            $table->foreignId('quiz_id ')->constrained('quizzes', 'id');
            $table->string('langage');
            $table->float('reussiteMoyenne');
            $table->integer('tempsMoyen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistiques');
    }
};
