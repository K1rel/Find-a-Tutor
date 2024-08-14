<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TeacherProfile;
use Illuminate\Http\Request;

class TeacherProfileController extends Controller
{
    public function show($id)
    {
        $teacherProfile = TeacherProfile::with('user.reviewsReceived')->findOrFail($id);
        return response()->json($teacherProfile);
    }
}
