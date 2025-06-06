<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   
    public function showLoginForm()
    {
        return response()->json(['message' => 'Login form']);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'motDePasse');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $user->createToken('auth_token')->plainTextToken
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    
    public function showRegistrationForm()
    {
        return response()->json(['message' => 'Registration form']);
    }

   
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ], 201);
    }


    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }
}