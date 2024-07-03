<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * Class Post
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $text_content
 * @property string|null $file_song
 * @property string|null $file_image
 * @property string $status
 * @property bool $is_private
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Post extends Model
{
    use LogsActivity;
    protected $table = 'post';

    protected $casts = [
        'user_id' => 'int',
        'is_private' => 'bool'
    ];

    protected $fillable = [
        'id',
        'user_id',
        'text_content',
        'file_song',
        'file_image',
        'status',
        'heart',
        'is_private',
        'count_of_comment'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->logOnlyDirty();
    }


    public function requestingEmployee()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function interact_heart()
    {
        return $this->hasMany(InteractSong::class, 'song_id', 'id');
    }
    public function comments()
    {
        return $this->hasMany(CommentPost::class, 'post_id', 'id');
    }
}
