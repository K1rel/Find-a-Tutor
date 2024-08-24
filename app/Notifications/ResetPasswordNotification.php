<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class ResetPasswordNotification extends BaseResetPasswordNotification
{
    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
   
        $url = url('/password/reset-form?token=' . $this->token . '&email=' . urlencode($notifiable->email));
       
        return (new MailMessage)
            ->view('emails.reset-password', ['user' => $notifiable, 'resetUrl' => $url])
            ->subject('Password Reset Request');
    }
}
