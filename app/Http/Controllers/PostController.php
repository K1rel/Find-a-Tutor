<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
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
        return Post::with('tag', 'user','user.teacherProfile', 'students')->findOrFail($id);
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
    
        // Validate incoming request
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'dateFirstClass' => 'required|date',
            'tag_name' => 'required|string',
            'education_level' => 'required|string',
            'maxCount' => 'required|integer|min:1',
            'rate' => 'required|integer',
        ]);
    
        try {
            // Check if the tag exists
            $tag = Tag::where('name', $validatedData['tag_name'])
                      ->where('education_level', $validatedData['education_level'])
                      ->first();
    
            // If the tag doesn't exist, create it
            if (!$tag) {
                $tag = Tag::create([
                    'name' => $validatedData['tag_name'],
                    'education_level' => $validatedData['education_level'],
                ]);
            }
            $post = Post::create([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'location' => $validatedData['location'],
                'dateFirstClass' => $validatedData['dateFirstClass'],
                'maxCount' => $validatedData['maxCount'],
                'rate' => $validatedData['rate'],
                'tag_id' => $tag->id, // Set the tag_id
                'user_id' => auth()->id(), // Assuming you are using authentication
            ]);
            // Create the post with the tag_id
        
    
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
            'rate' => 'required|integer',
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
        
        if ($post->students()->where('student_id', $user->id)->exists()) {
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
        Log::info("Post ID: $id, Student ID: $student_id, Auth User ID: " . Auth::id() );
        if ($post->user_id == Auth::id() || Auth::id() == $student_id) {
            $post->students()->detach($student_id);

            return response()->json(['message' => 'Student removed successfully.'], 200);
        
        }
        return response()->json(['message' => 'Unauthorized'], 403);
     
    }
    public function getUserPosts()
    {
        $user = Auth::user();

        if ($user->role === 'teacher') {
           
            $posts = Post::where('user_id', $user->id)->get();
        } elseif ($user->role === 'student') {
           
            $posts = Post::whereHas('students', function ($query) use ($user) {
                $query->where('student_id', $user->id);
            })->get();
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($posts);
    }
    public function searchPosts(Request $request)
{
    $query = $request->input('query');

    if (empty($query)) {
        return response()->json([]);
    }

    $posts = Post::where('title', 'ILIKE', "%$query%")
        ->orWhere('description', 'ILIKE', "%$query%")
        ->with('user', 'tag') 
        ->get();

    return response()->json($posts);
}


}
