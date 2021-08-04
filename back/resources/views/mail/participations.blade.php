@component('mail::message')
# Bonjour monsieur {{$name}} 

Le laboratoire " {{$laboratoire}} " a fait une nouvelle demande d'inscription sur le projet {{$projet}}.
Veuillez traiter cette demande le plus tot possible.



Cordialement,<br>
EEQ
@endcomponent
