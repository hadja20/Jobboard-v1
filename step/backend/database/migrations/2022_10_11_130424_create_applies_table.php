<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('advertisement_id')->nullable();
            $table->foreign('advertisement_id')
                ->references('id')
                ->on('advertisements')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->unsignedBigInteger('mail_id')->nullable();
            $table->foreign('mail_id')
                ->references('id')
                ->on('mails')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->unsignedBigInteger('jobseeker_id')->nullable();
            $table->foreign('jobseeker_id')
                ->references('id')
                ->on('jobseekers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applies');
    }
};
