<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Review;
use App\Models\TeacherProfile;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       

        User::factory(50)->create(['role' => 'student']);

        User::factory(10)->create(['role' => 'teacher'])->each(function ($user) {
            TeacherProfile::factory()->create(['user_id' => $user->id]);
        });
    
        Post::factory(20)->create();

        Review::factory(20)->create();

      
       
    }
}
