<?php

namespace App\Http\Controllers\api;

use App\Helper\Reply;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = (object)[];
        $data->user = auth()->user();
        $data->permissions = auth()->user()->getAllPermissions();
        return Reply::successWithData($data, __('messages.successful'));
    }
}
