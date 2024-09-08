<!DOCTYPE html>
<html>
<head>
    <title>Teacher Notification</title>
    <style>
        /* Add some basic styling for the email */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Hello {{ $student->first_name }} {{ $student->last_name }},</h1>

            
            <p>You have successfully enrolled in the post titled <strong>"{{ $post->title }}"</strong>.</p>
       
        <p>For more details, please visit the post directly.</p>

        
        <a href="http://localhost:3000/posts/{{ $post->id }}" class="button">View Post</a>

        <p class="footer">Best regards, <br> The Find a Tutor Online Team</p>
    </div>
</body>
</html>

    
