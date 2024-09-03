<?php

// namespace Database\Seeders;

// use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\DB;

// class TagsSeeder extends Seeder
// {
//     public function run()
//     {
//         $tags = [
//             ['name' => 'Math', 'education_level' => 'Elementary'],
//             ['name' => 'Science', 'education_level' => 'Middle School'],
//             ['name' => 'History', 'education_level' => 'High School'],
//             ['name' => 'English', 'education_level' => 'College'],
//             ['name' => 'Art', 'education_level' => 'College'],
//             ['name' => 'Biology', 'education_level' => 'College'],
//             ['name' => 'Chemistry', 'education_level' => 'College'],
//             ['name' => 'Physics', 'education_level' => 'College'],
//             ['name' => 'Geography', 'education_level' => 'High School'],
//             ['name' => 'Computer Science', 'education_level' => 'College'],
//         ];

//         foreach ($tags as $tag) {
//             DB::table('tags')->updateOrInsert([
//                 'name' => $tag['name'],
//                 'education_level' => $tag['education_level'],
//             ]);
//         }
//     }
// }
