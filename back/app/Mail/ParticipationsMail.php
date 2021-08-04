<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ParticipationsMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($nom,$laboratoire,$projet)
    {
        //
        $this->name=$nom;
        $this->laboratoire=$laboratoire;
        $this->projet=$projet;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.participations')->subject("Nouvelle demande de participation.")->with([
            'name' => $this->name,
            'laboratoire'=>$this->laboratoire,
            'projet'=>$this->projet
        ]);
    }
}
