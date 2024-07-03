<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\ActivityLogger;

/**
 * Class User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $user_name
 * @property Carbon $birth_day
 * @property string $gender
 * @property string $status
 * @property string|null $email
 * @property string|null $phone_number
 * @property string $password
 * @property int $count_follower
 * @property string $avatar
 * @property string $avatar_origin
 * @property string|null $background_image
 * @property string|null $country
 * @property string $language
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class User extends Model
{
    use HasRoles;
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';

    protected $casts = [
        'birth_day' => 'datetime',
        'count_follower' => 'int'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'user_name',
        'birth_day',
        'gender',
        'status',
        'email',
        'phone_number',
        'password',
        'count_follower',
        'avatar',
        'avatar_origin',
        'background_image',
        'country',
        'language',
        'remember_token'
    ];

    public function activity_log()
    {
        return $this->hasMany(ActivityLogger::class, 'causer_id', 'id');
    }
    public function user_has_role()
    {
        return $this->hasOne(ModelHasRole::class, 'model_id', 'id');
    }
}
