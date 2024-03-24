<?php

use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use HasRoles;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('user_name');
            $table->date('birth_day');
            $table->enum('gender', ['male', 'female', 'other'])->default('male');
            $table->enum('status', ['enable', 'disable'])->default('enable');
            $table->string('email')->nullable()->unique();
            $table->string('phone_number')->nullable()->unique();
            $table->string('password');
            $table->bigInteger('count_follower')->default(0);
            $table->string('avatar')->default('user.png');
            $table->string('avatar_origin')->default('user_origin.png');
            $table->string('background_image')->nullable();
            $table->string('country')->nullable();
            $table->string('language')->default('en');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
