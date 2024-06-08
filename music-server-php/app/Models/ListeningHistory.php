<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * Class ListeningHistory
 *
 * @property int $id
 * @property int $user_id
 * @property int $song_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class ListeningHistory extends Model
{
    use LogsActivity;
    protected $table = 'listening_history';

    protected $casts = [
        'user_id' => 'int',
        'song_id' => 'int'
    ];

    protected $fillable = [
        'user_id',
        'song_id'
    ];

    public function song()
    {
        return $this->hasOne(Song::class, 'id', 'song_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->logOnlyDirty();
    }
}
