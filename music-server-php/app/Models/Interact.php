<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Interact
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
class Interact extends Model
{
	protected $table = 'interacts';

	protected $casts = [
		'user_id' => 'int',
		'song_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'song_id',
		'type'
	];
}
