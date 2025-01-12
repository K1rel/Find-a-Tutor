<?php

namespace App\Http\Controllers;

use App\Models\TeacherProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
       
     
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:student,teacher',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:10000',
            'availability' => 'nullable|string',
            'willing_to_travel' => 'nullable|integer|min:0',
            'languages' => 'nullable|json', 
        ]);
       

        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
        }
        
        $validated['password'] = Hash::make($validated['password']);
      
    
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'profile_picture' => $profilePicturePath ?? null,
        ]);
        $token = Str::random(60);
        $user->api_token = $token;
        if ($validated['role'] === 'teacher') {
            TeacherProfile::create([
                'user_id' => $user->id,
                'availability' => $validated['availability'] ?? null,
                'willing_to_travel' => $validated['willing_to_travel'] ?? null,
                'languages' => $validated['languages'],
            ]);
        }
    
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ]);
    }
    

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $token = Str::random(60); 
        $user->api_token = $token; 
        $user->save();

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->api_token = null;
            $user->save();
            return response()->json(['message' => 'Logged out successfully']);
        }
    
        return response()->json(['message' => 'No user found'], 401);
    }

    public function currentUser(Request $request)
    {
     
        $user = $request->user();

    if ($user->role === 'teacher') {
        $user->load('teacherProfile'); 
    }

    return response()->json(['user' => $user]);
    }
    
}
