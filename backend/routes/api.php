<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuizController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(AuthController::class)->group(function() {
    Route::get('/login', 'showLoginForm')->name('login');
    Route::post('/login', 'login');
    Route::get('/register', 'showRegistrationForm')->name('register');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout')->name('logout');
});

// Routes publiques
Route::get('/quizzes', [QuizController::class, 'index']);
Route::get('/quizzes/langauage/{langauage}', [QuizController::class, 'getByLanguage']);
Route::get('/quizzes/{quiz}', [QuizController::class, 'show']);

// Questions
Route::get('/quizzes/{quiz}/questions', [QuestionController::class, 'index']);

// Réponses
Route::get('/questions/{question}/reponses', [ResponseController::class, 'index']);

// Routes protégées (admin)
Route::middleware(['auth', 'is_admin'])->group(function() {
    // Quiz
    Route::post('/quizzes', [QuizController::class, 'store']);
    Route::put('/quizzes/{quiz}', [QuizController::class, 'update']);
    Route::delete('/quizzes/{quiz}', [QuizController::class, 'destroy']);
    
    // Questions
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::put('/questions/{question}', [QuestionController::class, 'update']);
    Route::delete('/questions/{question}', [QuestionController::class, 'destroy']);
    
    // Réponses
    Route::post('/reponses', [ResponseController::class, 'store']);
    Route::put('/reponses/{reponse}', [ResponseController::class, 'update']);
    Route::delete('/reponses/{reponse}', [ResponseController::class, 'destroy']);
});