<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ApprouvationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($nom,$projet,$reponse)
    {
        //
        $this->name=$nom;
        $this->projet=$projet;
        $this->reponse=$reponse;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.approuvations')->subject("Demande d'inscription.")->with([
            'name' => $this->name,
            'projet'=>$this->projet,
            'reponse'=>$this->reponse
        ]);
    }
}
