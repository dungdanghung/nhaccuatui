<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PlayList
 * 
 * @property int $id
 * @property int $user_id
 * @property int $song_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class PlayList extends Model
{
	protected $table = 'play_list';

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
}
