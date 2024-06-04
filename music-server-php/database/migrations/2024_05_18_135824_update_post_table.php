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
        Schema::table('post', function (Blueprint $table) {
            $table->bigInteger('heart')->default(0);
            $table->bigInteger('count_of_share')->default(0);
            $table->bigInteger('count_of_comment')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post', function (Blueprint $table) {
            $table->dropColumn('heart');
            $table->dropColumn('count_of_share');
            $table->dropColumn('count_of_comment');
        });
    }
};
