<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TeacherNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $teacher;
    public $post;
    public $student;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($teacher, $post, $student = null)
    {
        $this->teacher = $teacher;
        $this->post = $post;
        $this->student = $student;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Notification from Find a Tutor Online')
                    ->view('emails.teacher-notification');
    }
}
