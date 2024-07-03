<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Helper\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class AutherController extends Controller
{


    public function Login(Request $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required', 'min:8'],
        ]);
        try {
            $user = User::where('user_name', $request->username)->first();

            // $permissions = [
            //     "login",
            //     "register",
            //     "change_password",
            //     "upload_song",
            //     "update_song",
            //     "delete_song",
            //     "view_song",
            //     "upload_mv",
            //     "update_mv",
            //     "delete_mv",
            //     "view_mv",
            //     // "manager_mv",
            //     // "manager_song",
            //     "download_song",
            //     "create_post",
            //     "view_post",
            //     "add_comment",
            //     "view_comment",
            //     "delete_comment",
            //     "view_zingchart",
            //     "add_playlist",
            // ];

            // foreach ($permissions as $permission) {
            //     $new_permission = Permission::where('name', $permission)->first();
            //     $new_permission->assignRole('User');
            // }



            if (!$user) return Reply::error(__('messages.user_not_found'), 404);
            if (!Hash::check($request->password, $user->password)) {
                return Reply::error(__('messages.incorrect_password'), 400);
            }
            $token = $user->createToken('Admin-Token')->plainTextToken;
            return Reply::successWithData(["token" => $token], __('messages.successful'));
        } catch (\Throwable $th) {
            return Reply::error(__('messages.something_went_wrong'));
        }
    }
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'user_name' => ['required', 'string', 'unique:users,user_name'],
            'emailorphone' => ['required', 'string', 'unique:users,email', 'unique:users,phone_number'],
            'gender' => ['required', 'string', 'in:male,female'],
            'birth_day' => ['required', 'date'],
            'password' => ['required', 'string']
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
            // $input = $request->only('first_name', 'last_name', 'user_name', 'gender', 'birth_day');
            $input['first_name'] = $request->first_name;
            $input['last_name'] = $request->last_name;
            $input['user_name'] = $request->user_name;
            $input['gender'] = $request->gender;
            $input['birth_day'] = $request->birth_day;
            $input['email'] = $email;
            $input['phone_number'] = $phone;
            $input['password'] = Hash::make($request->password);
            $new_user = User::Create($input);

            $new_user->assignRole('User');

            DB::commit();
            return Reply::success();
        } catch (\Exception $e) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
    }
}
