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
 * Class InteractSong
 * 
 * @property int $id
 * @property int $user_id
 * @property int $song_id
 * @property string $type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class InteractSong extends Model
{
	use LogsActivity;
	protected $table = 'interact_song';

	protected $casts = [
		'user_id' => 'int',
		'song_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'song_id',
		'type'
	];

	public function getActivitylogOptions(): LogOptions
	{
		return LogOptions::defaults()
			->logOnly(['*'])
			->logOnlyDirty();
	}
}
