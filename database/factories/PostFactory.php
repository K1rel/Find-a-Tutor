<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use App\Models\User;
use App\Models\Tag;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'user_id' => User::where('role', 'teacher')->inRandomOrder()->first()->id,
            'tag_id' => Tag::inRandomOrder()->first()->id,
            'location' => $this->faker->city,
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'maxCount' => $this->faker->numberBetween(1, 10),
            'rate' => $this->faker->numberBetween(10, 100),
            'dateFirstClass' => $this->faker->date(),
        ];
    }
}
