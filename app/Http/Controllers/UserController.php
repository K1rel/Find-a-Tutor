<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:10000',
            'role' => 'required|in:student,teacher',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        Log::info('aaaaa:', $request->all());
    
        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
           
            'availability' => 'nullable|in:online,in_person,both',
            'willing_to_travel' => 'nullable|numeric|min:0',
         
            'languages' => 'nullable|array', // Updated to array
            'languages.*' => 'string|max:255' 
        ]);
    
        
        $profilePicturePath = $user->profile_picture;
    
        if ($request->hasFile('profile_picture')) {
            $validated = $request->validate([
                'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:10000',
            ]);
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
    
            $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
        }
    
        $user->first_name = $request->first_name ?? $user->first_name;
        $user->last_name = $request->last_name ?? $user->last_name;
        $user->email = $request->email ?? $user->email;
        $user->profile_picture = $profilePicturePath;
        $user->save();
        Log::info('User updated:', ['user' => $user]);
        
        if ($user->role === 'teacher') {
            $teacherProfile = $user->teacherProfile; 
    
            $teacherProfile->update([
                'availability' => $validated['availability'] ?? $teacherProfile->availability,
                'willing_to_travel' => $validated['willing_to_travel'] ?? $teacherProfile->willing_to_travel,
                'languages' => $validated['languages'] ? json_encode($validated['languages']) : $teacherProfile->languages,
            ]);
            Log::info('Teacher profile updated:', ['teacherProfile' => $teacherProfile]);
        }
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
