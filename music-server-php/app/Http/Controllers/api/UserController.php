<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use App\Models\User;
use App\Helper\Reply;
use App\Models\Follow;
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


    public function getUserUpload(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        try {
            $users = User::orderBy('created_at', 'desc')
                ->limit(30)
                ->get();
            $format_user = [];
            foreach ($users as $user) {
                array_push($format_user, [
                    'id' => $user->id,
                    'user_name' => $user->user_name,
                    'avatar' => $user->avatar,
                    'date' => Carbon::parse($user->created_at),
                    'status' => $user->status
                ]);
            }
        } catch (\Throwable $th) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        return response()->json($format_user);
    }

    public function getUserByID($id)
    {
        if (empty($id)) {
            return Reply::error(__('messages.something_went_wrong'));
        } else {
            $user = User::where('id', $id)->first();
            $follow_count = Follow::where('user_id', $id)->count();
            $count_follow = Follow::where('follower', $id)->count();
            $format = [
                'id' => $user->id,
                'user_name' => $user->user_name,
                'avatar' => $user->avatar,
                'background_image' => $user->background_image,
                'follower' => $follow_count,
                'count_follow' => $count_follow
            ];
            return response()->json($format);
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'user_name' => ['required', 'string'],
            'emailorphone' => ['required', 'string'],
            'gender' => ['required', 'string', 'in:male,female'],
            'birth_day' => ['required', 'date'],
        ]);

        $email = (int)$request->emailorphone == 0 ? $request->emailorphone : null;
        $phone = (int)$request->emailorphone == 0 ? null : $request->emailorphone;
        if ($email != null) {
            $request->validate([
                'emailorphone' => ['required', 'email']
            ]);
        }

        try {
            DB::beginTransaction();
            $input['first_name'] = $request->first_name;
            $input['last_name'] = $request->last_name;
            $input['user_name'] = $request->user_name;
            $input['gender'] = $request->gender;
            $input['birth_day'] = $request->birth_day;
            $input['email'] = $email;
            $input['phone_number'] = $phone;
            auth()->user()->update($input);
            DB::commit();
            return Reply::success();
        } catch (\Exception $e) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
    }
}
