<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class permisitionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'Admin']);
        $role_user = Role::create(['name' => 'User']);
        $role_author = Role::create(['name' => 'Author']);

        $input['first_name'] = "dang hung";
        $input['last_name'] = "dung";
        $input['user_name'] = "admin";
        $input['gender'] = "male";
        $input['birth_day'] = "2004/04/12";
        $input['email'] = "dung@gmail.com";
        $input['phone_number'] = "0918180441";
        $input['password'] = Hash::make("123456789");
        $new_user = User::Create($input);
        $new_user->assignRole('Admin');
        $permissions = [
            "login",
            "register",
            "change_password",
            "upload_song",
            "update_song",
            "delete_song",
            "view_song",
            "upload_mv",
            "update_mv",
            "delete_mv",
            "view_mv",
            "manager_mv",
            "manager_song",
            "download_song",
            "create_post",
            "view_post",
            "add_comment",
            "view_comment",
            "delete_comment",
            "view_zingchart",
            "add_playlist",
        ];

        foreach ($permissions as $permission) {
            $new_permission = Permission::create(['name' => $permission, 'guard_name' => 'web']);
            $new_permission->assignRole('Admin');
            $new_user->givePermissionTo($permission);
        }

        // $permission->assignRole('User');
        // $permission->assignRole('Author');
    }
}
