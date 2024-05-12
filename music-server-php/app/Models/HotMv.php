<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class HotMv
 * 
 * @property int $id
 * @property int $mv_id
 * @property Carbon|null $start_time
 * @property int|null $value
 * @property Carbon|null $end_time
 * @property Carbon|null $new_start_time
 * @property int|null $new_value
 * @property Carbon|null $new_end_time
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class HotMv extends Model
{
	protected $table = 'hot_mv';

	protected $casts = [
		'mv_id' => 'int',
		'start_time' => 'datetime',
		'value' => 'int',
		'end_time' => 'datetime',
		'new_start_time' => 'datetime',
		'new_value' => 'int',
		'new_end_time' => 'datetime'
	];

	protected $fillable = [
		'mv_id',
		'start_time',
		'value',
		'end_time',
		'new_start_time',
		'new_value',
		'new_end_time'
	];
}
