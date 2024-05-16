<?php

namespace App\Http\Controllers\api;

use App\Helper\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = (object)[];
        $data->user = auth()->user();
        $data->permissions = auth()->user()->getAllPermissions();
        return Reply::successWithData($data, __('messages.successful'));
    }

    public function setAvatar(Request $request)
    {
        $rules = [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif',
        ];

        $validator = Validator::make($request->only('avatar'), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        DB::beginTransaction();
        try {
            $nameImage = auth()->user()->username . time() . '.' . $request->file('avatar')->getClientOriginalExtension();
            Storage::disk('local')->putFileAs('img/avatar', $request->file('avatar'), $nameImage);
            Storage::disk('local')->putFileAs('img/avatar_original', $request->file('avatar'), $nameImage);
            Storage::disk('public')->putFileAs('img/avatar', $request->file('avatar'), $nameImage);
            Storage::disk('public')->putFileAs('img/avatar_original', $request->file('avatar'), $nameImage);

            auth()->user()->update([
                'avatar_origin' => $nameImage,
                'avatar' => $nameImage
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }


        return Reply::success();
    }


    public function setBackground(Request $request)
    {
        $rules = [
            'background' => 'required|image|mimes:jpeg,png,jpg,gif',
        ];

        $validator = Validator::make($request->only('background'), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        DB::beginTransaction();
        try {
            $nameImage = auth()->user()->username . time() . '.' . $request->file('background')->getClientOriginalExtension();
            Storage::disk('local')->putFileAs('img/background', $request->file('background'), $nameImage);
            Storage::disk('local')->putFileAs('img/background_original', $request->file('background'), $nameImage);
            Storage::disk('public')->putFileAs('img/background', $request->file('background'), $nameImage);
            Storage::disk('public')->putFileAs('img/background_original', $request->file('background'), $nameImage);

            auth()->user()->update([
                'background_image' => $nameImage,
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }


        return Reply::success();
    }
}
