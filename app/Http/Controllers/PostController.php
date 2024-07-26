<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function index()
    {
        return Post::with('tag', 'user', 'students')->get();
    }

    public function show($id)
    {
        return Post::with('tag', 'user', 'students')->findOrFail($id);
    }

    // public function store(Request $request)
    // {
    //     // $validated = $request->validate([
    //     //     'title' => 'required|string|max:255',
    //     //     'description' => 'required|string',
    //     //     'location' => 'required|string',
    //     //     'dateFirstClass' => 'required|date',
    //     //     'tag_id' => 'required|exists:tags,id',
    //     //     'maxCount' => 'required|integer|min:1',
    //     // ]);

    //     // $user = Auth::user();

    //     // $post = $user->posts->create(array_merge($validated, ['user_id' => $user->id]));

    //     // return response()->json($post, 201);
    // }
    public function store(Request $request)
    {
        $user = Auth::user();
    
        if (!$user) {
            Log::error('User is null');
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        if ($user->role !== 'teacher') {
            Log::error('User is not a teacher');
            return response()->json(['error' => 'Unauthorized: Only teachers can create posts'], 403);
        }
        try {
            $post = $user->posts()->create($request->all());
            return response()->json($post, 201);
        } catch (\Exception $e) {
            Log::error('Error creating post: ' . $e->getMessage());
            return response()->json(['error' => 'Error creating post'], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'location' => 'sometimes|required|string',
            'dateFirstClass' => 'sometimes|required|date',
            'tag_id' => 'sometimes|required|exists:tags,id',
            'maxCount' => 'sometimes|required|integer|min:1',
        ]);

        $post = Post::findOrFail($id);
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->update($validated);

        return response()->json($post, 200);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(null, 204);
    }

    public function addStudent(Request $request, $id)
    {
      
    $post = Post::findOrFail($id);
    $user = Auth::user();

    if ($post->students()->count() >= $post->maxCount) {
        return response()->json(['message' => 'The maximum number of students has been reached.'], 400);
    }

    if ($user->role === 'student') {
        
        if ($post->students()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Student already added to the post.'], 400);
        }

        $post->students()->attach($user->id);
        return response()->json(['message' => 'Student added to post'], 200);
    } elseif ($user->role === 'teacher' && $post->user_id === $user->id) {
       
        $studentId = $request->input('student_id');

        if (!$studentId || !User::where('id', $studentId)->where('role', 'student')->exists()) {
            return response()->json(['message' => 'Invalid student ID.'], 400);
        }

        if ($post->students()->where('student_id', $studentId)->exists()) {
            return response()->json(['message' => 'Student already added to the post.'], 400);
        }

        $post->students()->attach($studentId);
        return response()->json(['message' => 'Student added to post'], 200);
    } else {
        return response()->json(['message' => 'Only students can join the post.'], 400);
    }
    }

    public function removeStudent($id, $student_id)
    {
        $post = Post::findOrFail($id);
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $post->students()->detach($student_id);

        return response()->json(['message' => 'Student removed successfully.'], 200);
    }
}
