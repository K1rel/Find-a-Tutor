<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    use HasFactory;
   protected $guarded = [];
   public function user(): BelongsTo{
    return $this->belongsTo(User::class);
}

public function tag(): BelongsTo
{
    return $this->belongsTo(Tag::class);
}
public function students(): BelongsToMany
{
    return $this->belongsToMany(User::class, 'post_student', 'post_id', 'student_id');
}

}
