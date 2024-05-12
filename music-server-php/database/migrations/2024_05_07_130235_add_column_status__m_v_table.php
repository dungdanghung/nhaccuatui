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
        Schema::table('_m_v', function (Blueprint $table) {
            $table->enum('status', ['pending', 'accept', 'canceled'])->default('pending')->after('discription');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('_m_v', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
