<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('song_name');
            $table->string('song_file');
            $table->date('date');
            $table->string('thumbnail');
            $table->bigInteger('type_id');
            $table->string('image')->default('song_image');
            $table->enum('status', ['pending', 'accept', 'canceled'])->default('pending');
            $table->bigInteger('user_id');
            $table->bigInteger('count_heart')->default(0);
            $table->string('singer');
            $table->string('discription')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
