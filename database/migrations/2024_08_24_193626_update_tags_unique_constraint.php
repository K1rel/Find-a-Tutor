<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tags', function (Blueprint $table) {
            // Drop the existing unique constraint
            $table->dropUnique('tags_name_unique');

            // Add a new unique constraint for the combination of name and education_level
            $table->unique(['name', 'education_level']);
        });
    }

    public function down()
    {
        Schema::table('tags', function (Blueprint $table) {
            // Drop the combined unique constraint
            $table->dropUnique(['name', 'education_level']);

            // Restore the original unique constraint on the name column
            $table->unique('name');
        });
    }
};
