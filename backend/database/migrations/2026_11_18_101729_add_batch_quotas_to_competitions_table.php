
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->unsignedInteger('quota_batch_1')
                ->default(20)
                ->after('quota');

            $table->unsignedInteger('quota_batch_2')
                ->default(20)
                ->after('quota_batch_1');
        });

        // Total kuota = kuota Batch 1 + Batch 2
        DB::table('competitions')->update([
            'quota' => DB::raw('quota_batch_1 + quota_batch_2'),
        ]);
    }

    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropColumn([
                'quota_batch_1',
                'quota_batch_2',
            ]);
        });
    }
};
