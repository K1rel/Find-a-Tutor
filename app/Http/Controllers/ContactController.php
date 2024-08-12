<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'message' => 'required|string',
        ]);

        Mail::send('emails.contact', ['data1'=>$data], function ($message)use ($data)  {
            $message->from($data['email'], $data['name'])  
            ->to('kiril.gerasimovski@gmail.com') 
                    ->subject('New Contact Form Submission');
                
        });

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}