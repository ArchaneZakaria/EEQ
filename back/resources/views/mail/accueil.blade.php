@component('mail::message')
# Bienvenue monsieur {{$name}} 

Nous vous informons que nous allons traiter votre demande d'inscription le plus tot possible.<br>
Et on vous invite de visiter le site de l'INH pour plus d'informations.


@component('mail::button', ['url' => 'http://inh.ma/'])
Visiter le site
@endcomponent

Cordialement,<br>
Institut National d'hygiéne.
@endcomponent
