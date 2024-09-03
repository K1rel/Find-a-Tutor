<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    public function index($teacherId)
    {
        $teacher = User::findOrFail($teacherId);
        $reviews = Review::where('teacher_id', $teacherId)->with('student')->get();
         Log::info($reviews);
        return response()->json([
            'teacher' => $teacher,
            'reviews' => $reviews,
        ]);
    }

    
    public function store(Request $request, $teacherId)
    {
        $request->validate([
            'review' => 'required|string|max:1000',
            'rating' => 'required|integer|min:0|max:10',
        ]);

        $studentId = Auth::id();
        Log::info('User ID: ' . $studentId);
        if (Auth::user()->role !== 'student') {
            return response()->json([
                'message' => 'Only students can leave a review.',
            ], 403);
        }
       
        $existingReview = Review::where('teacher_id', $teacherId)
                                ->where('student_id', $studentId)
                                ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'You have already reviewed this teacher.',
            ], 400);
        }

        $review = Review::create([
            'teacher_id' => $teacherId,
            'student_id' => $studentId,
            'review' => $request->review,
            'stars' => $request->rating,
        ]);

        return response()->json([
            'message' => 'Review created successfully.',
            'review' => $review,
        ], 201);
    }

   
    public function update(Request $request, $teacherId)
    {
        $request->validate([
            'review' => 'required|string|max:1000',
            'stars' => 'required|integer|min:0|max:10',
        ]);

        $studentId = Auth::id();

        $review = Review::where('teacher_id', $teacherId)
                        ->where('student_id', $studentId)
                        ->firstOrFail();

        $review->update([
            'review' => $request->review,
            'stars' => $request->stars,
        ]);

        return response()->json([
            'message' => 'Review updated successfully.',
            'review' => $review,
        ], 200);
    }

   
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
    
        if (Auth::user()->role !== 'student' || Auth::id() !== $review->student_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    
        $review->delete();
    
        return response()->json(['message' => 'Review deleted successfully.'], 200);
    }
    
    public function getAllReviewsForTeacher($teacherId)
    {
       
        $teacher = User::find($teacherId);

        if (!$teacher) {
            return response()->json([
                'message' => 'Teacher not found.',
            ], 404);
        }

       
        $reviews = Review::where('teacher_id', $teacherId)->with('student')->get();

        return response()->json([
            'reviews' => $reviews,
        ], 200);
    }
    public function getMyReviews()
{
    $user = Auth::user();

    if ($user->role === 'student') {
        
        $reviews = Review::where('student_id', $user->id)->with('teacher')->get();
    } elseif ($user->role === 'teacher') {
        
        $reviews = Review::where('teacher_id', $user->id)->with('student')->get();
    } else {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    return response()->json(['reviews' => $reviews]);
}
}
