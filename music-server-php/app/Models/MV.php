<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MV
 *
 * @property int $id
 * @property string $title
 * @property string $video
 * @property string $image
 * @property int $user_id
 * @property Carbon $originaly_released
 * @property string|null $discription
 * @property string $status
 * @property string $composition_copyright
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class MV extends Model
{
    protected $table = '_m_v';

    protected $casts = [
        'user_id' => 'int',
        'originaly_released' => 'datetime'
    ];

    protected $fillable = [
        'title',
        'video',
        'image',
        'user_id',
        'originaly_released',
        'discription',
        'status',
        'composition_copyright'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
