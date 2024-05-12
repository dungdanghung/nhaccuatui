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
        Schema::create('hot_mv', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('mv_id');
            $table->dateTime('start_time')->nullable();
            $table->bigInteger('value')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->dateTime('new_start_time')->nullable();
            $table->bigInteger('new_value')->nullable();
            $table->dateTime('new_end_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hot_mv');
    }
};
