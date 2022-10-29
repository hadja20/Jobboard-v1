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
        Schema::create('mails', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->string('from');
            $table->string('to');
            $table->text('body');
            $table->unsignedBigInteger('jobseeker_id')->nullable();
            $table->foreign('jobseeker_id')
                ->references('id')
                ->on('jobseekers')
                ->onDelete('cascade')
                ->onUpdate('restrict');
            $table->unsignedBigInteger('recruiter_id')->nullable();
            $table->foreign('recruiter_id')
                ->references('id')
                ->on('recruiters')
                ->onDelete('cascade')
                ->onUpdate('restrict');
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
        Schema::dropIfExists('mails');
    }
};
