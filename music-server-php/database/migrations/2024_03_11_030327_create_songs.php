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
            $table->string('title');
            $table->string('artists');
            $table->string('primary_genre');
            $table->string('secondary_genre');
            $table->string('composition_copyright');
            $table->string('record_laber_name');
            $table->date('originaly_released');
            $table->string('audio');
            $table->string('image');
            $table->string('thumbnail');
            $table->bigInteger('type_id')->nullable();
            $table->enum('status', ['pending', 'accept', 'canceled'])->default('pending');
            $table->bigInteger('user_id');
            $table->bigInteger('heart')->default(0);
            $table->string('discription')->nullable();
            $table->timestamps();
            $table->dateTime('delete_ad')->nullable();
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
