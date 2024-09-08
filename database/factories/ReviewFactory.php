<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Review;
use App\Models\TeacherProfile;
use App\Models\User;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition()
    {
     
         $teacherProfile = TeacherProfile::inRandomOrder()->first();
         $student = User::where('role', 'student')->inRandomOrder()->first();
         
      
         if (!$teacherProfile) {
             $teacher = User::factory()->create(['role' => 'teacher']);
             $teacherProfile = TeacherProfile::factory()->create(['user_id' => $teacher->id]);
         }
 
         if (!$student) {
             $student = User::factory()->create(['role' => 'student']);
         }
 
     
         if (Review::where('teacher_id', $teacherProfile->id)
                   ->where('student_id', $student->id)
                   ->exists()) {
             return $this->definition();
         }
 
         return [
             'teacher_id' => $teacherProfile->id,
             'student_id' => $student->id,
             'review' => $this->faker->paragraph,
             'stars' => $this->faker->numberBetween(0, 10),
         ];
    }
}
