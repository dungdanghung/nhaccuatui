<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CommentPost
 * 
 * @property int $id
 * @property int $user_id
 * @property int $post_id
 * @property string $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class CommentPost extends Model
{
	protected $table = 'comment_post';

	protected $casts = [
		'user_id' => 'int',
		'post_id' => 'int'
	];

	protected $fillable = [
		'id',
		'user_id',
		'post_id',
		'description'
	];

	public function user()
	{
		return $this->hasOne(User::class, 'id', 'user_id');
	}
}
