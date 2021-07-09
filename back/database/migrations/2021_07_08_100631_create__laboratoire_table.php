<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLaboratoireTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laboratoire', function (Blueprint $table) {
            $table->id('Id_Laboratoire');
            $table->string('Nom_Laboratoire',245);
            $table->string('Responsable_Laboratoire',145);
            $table->string('Num_Tel_Laboratoire',45);
            $table->string('Email_Laboratoire',145);
            $table->string('Adresse_Laboratoire',145);
            $table->string('Discipline_Laboratoire',45);
            $table->string('Code_Acces_Laboratoire',45);
            $table->date('Cdate_Laboratoire');
            $table->integer('Cby_Laboratoire');
            $table->date('Udate_Laboratoire');
            $table->integer('Uby_Laboratoire');
            $table->date('Ddate_Laboratoire');
            $table->integer('Dby_Laboratoire');
            $table->integer('Deleted_Laboratoire');
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
        Schema::dropIfExists('laboratoire');
    }
}
