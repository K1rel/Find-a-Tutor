<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TeacherProfile;
use App\Models\User;

class TeacherProfileFactory extends Factory
{
    protected $model = TeacherProfile::class;

    public function definition()
    {
        return [
            'availability' => $this->faker->randomElement(['online', 'in_person', 'both']),
            'willing_to_travel' => $this->faker->numberBetween(5, 100),
            'languages' => json_encode([$this->faker->languageCode]),
        ];
    }
}
