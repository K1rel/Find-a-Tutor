<?php
namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Fideloper\Proxy\TrustProxies as BaseTrustProxies; // If using older versions of Laravel

class TrustProxies extends Middleware
{
    protected $proxies;

    protected $headers = [
        \Illuminate\Http\Request::HEADER_X_FORWARDED_FOR,
        \Illuminate\Http\Request::HEADER_X_FORWARDED_HOST,
        \Illuminate\Http\Request::HEADER_X_FORWARDED_PORT,
        \Illuminate\Http\Request::HEADER_X_FORWARDED_PROTO,
        \Illuminate\Http\Request::HEADER_X_FORWARDED_AWS_ELB,
    ];
}
