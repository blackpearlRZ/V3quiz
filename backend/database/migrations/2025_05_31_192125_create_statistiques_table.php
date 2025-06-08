<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statistiques', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('utilisateur_id')
                  ->constrained('utilisateurs')
                  ->onDelete('cascade');
            
            $table->foreignId('quiz_id')
                  ->constrained('quizzes')
                  ->onDelete('cascade');
            
            $table->string('langage', 50);
            
            $table->decimal('reussiteMoyenne', 5, 2)
                  ->comment('Average success percentage (0-100)');
            
            $table->integer('tempsMoyen')
                  ->unsigned()
                  ->comment('Average time per question in seconds');
            
            $table->integer('total_questions')->unsigned();
            $table->integer('questions_correctes')->unsigned();
            $table->integer('temps_total')->unsigned()->comment('Total quiz time in seconds');
            
            $table->timestamps();
            
            $table->index(['utilisateur_id', 'langage']);
            $table->index(['quiz_id', 'langage']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statistiques');
    }
};