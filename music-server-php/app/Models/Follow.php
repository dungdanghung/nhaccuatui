<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Follow
 * 
 * @property int $id
 * @property int $user_id
 * @property int $follower
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Follow extends Model
{
	protected $table = 'follows';

	protected $casts = [
		'user_id' => 'int',
		'follower' => 'int'
	];

	protected $fillable = [
		'user_id',
		'follower'
	];
}
