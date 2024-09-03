<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Review;
use App\Models\User;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition()
    {
        $teacher = User::where('role', 'teacher')->inRandomOrder()->first();
        $student = User::where('role', 'student')->inRandomOrder()->first();
        
      
        $teacherId = $teacher ? $teacher->id : User::factory()->create(['role' => 'teacher'])->id;
        $studentId = $student ? $student->id : User::factory()->create(['role' => 'student'])->id;

      
        if (Review::where('teacher_id', $teacherId)
                  ->where('student_id', $studentId)
                  ->exists()) {
          
            return $this->definition();
        }

        return [
            'teacher_id' => $teacherId,
            'student_id' => $studentId,
            'review' => $this->faker->paragraph,
            'stars' => $this->faker->numberBetween(0, 10),
        ];
    }
}
