<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('education_level');
            $table->timestamps();
        });
          // Seed the tags table with 10 random tags
          $tags = [
            ['name' => 'Math', 'education_level' => 'Elementary'],
            ['name' => 'Science', 'education_level' => 'Middle School'],
            ['name' => 'History', 'education_level' => 'High School'],
            ['name' => 'English', 'education_level' => 'College'],
            ['name' => 'Art', 'education_level' => 'College'],
            ['name' => 'Biology', 'education_level' => 'College'],
            ['name' => 'Chemistry', 'education_level' => 'College'],
            ['name' => 'Physics', 'education_level' => 'College'],
            ['name' => 'Geography', 'education_level' => 'High School'],
            ['name' => 'Computer Science', 'education_level' => 'College'],
        ];

        foreach ($tags as $tag) {
            DB::table('tags')->insert([
                'name' => $tag['name'],
                'education_level' => $tag['education_level'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
