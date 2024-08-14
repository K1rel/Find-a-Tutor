<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|exists:users,id',
            'student_id' => 'required|exists:users,id',
            'review' => 'required|string',
        ]);

        $review = Review::create($validated);
        return response()->json($review, 201);
    }
}
