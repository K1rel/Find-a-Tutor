<!DOCTYPE html>
<html>
<head>
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
        }
        p {
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .info {
            background-color: #f8f9fa;
            padding: 15px;
            border-left: 5px solid #007bff;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .info p {
            margin: 0;
            padding: 5px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Form Submission</h1>
        <div class="info">
            <p><strong>Name:</strong> {{ $data1['name'] }}</p>
            <p><strong>Email:</strong> {{ $data1['email'] }}</p>
            <p><strong>Message:</strong></p>
            <p>{{ $data1['message'] }}</p>
        </div>
       
    </div>
</body>
</html>
