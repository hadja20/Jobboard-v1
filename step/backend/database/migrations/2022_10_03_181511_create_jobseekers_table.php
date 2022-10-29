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
        Schema::create('jobseekers', function (Blueprint $table) {
            $table->id();
            $table->text('bio')->nullable();
            $table->string('phone')->nullable();
            $table->string('cv')->nullable();
            $table->string('cover_letter')->nullable();
            $table->unsignedBigInteger('person_id')->nullable();
            $table->foreign('person_id')
                ->references('id')
                ->on('people')
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
        Schema::dropIfExists('jobseekers');
    }
};
