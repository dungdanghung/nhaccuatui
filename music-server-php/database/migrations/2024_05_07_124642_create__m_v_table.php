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
        Schema::create('_m_v', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('video');
            $table->string('image');
            $table->bigInteger('user_id');
            $table->dateTime('originaly_released');
            $table->string('discription')->nullable();
            $table->string('composition_copyright');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_m_v');
    }
};
