
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->unsignedBigInteger('registration_fee_batch_1')
                ->nullable()
                ->after('registration_fee');

            $table->unsignedBigInteger('registration_fee_batch_2')
                ->nullable()
                ->after('registration_fee_batch_1');
        });
    }

    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropColumn([
                'registration_fee_batch_1',
                'registration_fee_batch_2',
            ]);
        });
    }
};
