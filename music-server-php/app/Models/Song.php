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
 * Class Song
 *
 * @property int $id
 * @property string $title
 * @property string $artists
 * @property string|null $language
 * @property string $primary_genre
 * @property string $secondary_genre
 * @property string $composition_copyright
 * @property string $record_laber_name
 * @property Carbon $originaly_released
 * @property string $audio
 * @property string $image
 * @property string $thumbnail
 * @property int|null $type_id
 * @property string $status
 * @property int $user_id
 * @property int $heart
 * @property string|null $discription
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $delete_ad
 *
 * @package App\Models
 */
class Song extends Model
{
    use LogsActivity;
    protected $table = 'songs';

    protected $casts = [
        'originaly_released' => 'datetime',
        'type_id' => 'int',
        'user_id' => 'int',
        'heart' => 'int',
        'delete_ad' => 'datetime'
    ];

    protected $fillable = [
        'title',
        'artists',
        'language',
        'primary_genre',
        'secondary_genre',
        'composition_copyright',
        'record_laber_name',
        'originaly_released',
        'audio',
        'image',
        'thumbnail',
        'type_id',
        'lyric_file',
        'status',
        'user_id',
        'heart',
        'discription',
        'delete_ad'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->logOnlyDirty();
    }

    public function interact_heart()
    {
        return $this->hasMany(InteractSong::class, 'song_id', 'id');
    }
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function playlist()
    {
        return $this->hasMany(PlayList::class, 'song_id', 'id');
    }
}
