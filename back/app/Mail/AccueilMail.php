<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AccueilMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $name="";
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($nom)
    {
        //
        $this->name=$nom;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.accueil')->subject("Evaluation externe de qualité.")->with([
            'name' => $this->name
        ]);
    }
}
