<?php

namespace App\Http\Controllers\api;

use App\Models\MV;
use Carbon\Carbon;
use App\Models\Song;
use App\Models\User;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use App\Models\ListeningHistory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Spatie\Activitylog\ActivityLogger;
use Spatie\Activitylog\Models\Activity;

class ManagerController extends Controller
{
    public function getChartUser(Request $request)
    {
        // if (!auth()->user()->hasPermissionTo('manager_song')) {
        //     return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        // }

        // $last_7_day = now()->startOfWeek();

        // $users = User::whereDate('created_at', '>=', $last_7_day->format('Y-m-d'))->get();

        // $data = [];
        // $day_cache = Carbon::parse($users[0]->created_at);
        // $value_cache = 0;
        // foreach ($users as $user) {
        //     $user_create_date = Carbon::parse($user->created_at);
        //     if ($day_cache != $user_create_date) {
        //         $day_cache = $user_create_date;
        //         array_push($data, $value_cache);
        //         $value_cache = 0;
        //     }
        //     $value_cache += 1;
        // }
        // array_push($data, $value_cache);
        // return response()->json($data);
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $startOfWeek = now()->startOfWeek();
        $now = now();

        $period = CarbonPeriod::create($startOfWeek, '1 day', $now);
        $data = [];
        foreach ($period as $day) {
            $songs = User::whereDate('created_at', '=', $day->format('Y-m-d'))->count();
            array_push($data, $songs);
        }
        return response()->json($data);
    }

    public function getSongAccept(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $startOfWeek = now()->startOfWeek();
        $now = now();

        $period = CarbonPeriod::create($startOfWeek, '1 day', $now);
        $data = [];
        foreach ($period as $day) {
            $songs = Song::whereDate('created_at', '=', $day->format('Y-m-d'))->where('status', 'accept')->count();
            array_push($data, $songs);
        }
        return response()->json($data);
    }

    public function getMVAccept(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $startOfWeek = now()->startOfWeek();
        $now = now();

        $period = CarbonPeriod::create($startOfWeek, '1 day', $now);
        $data = [];
        foreach ($period as $day) {
            $songs = MV::whereDate('created_at', '=', $day->format('Y-m-d'))->where('status', 'accept')->count();
            array_push($data, $songs);
        }
        return response()->json($data);
    }

    public function getChartSong(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $startOfWeek = now()->startOfWeek();
        $now = now();

        $period = CarbonPeriod::create($startOfWeek, '1 day', $now);
        $data = [];
        foreach ($period as $day) {
            $songs = Song::whereDate('created_at', '=', $day->format('Y-m-d'))->count();
            array_push($data, $songs);
        }
        return response()->json($data);
    }

    public function getChartMV(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $startOfWeek = now()->startOfWeek();
        $now = now();

        $period = CarbonPeriod::create($startOfWeek, '1 day', $now);
        $data = [];
        foreach ($period as $day) {
            $songs = MV::whereDate('created_at', '=', $day->format('Y-m-d'))->count();
            array_push($data, $songs);
        }
        return response()->json($data);
    }

    public function getChartUserOnline(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $startOfWeek = now()->startOfWeek();
        $now = now();

        $period = CarbonPeriod::create($startOfWeek, '1 day', $now);
        $data = [];
        foreach ($period as $day) {
            $value = 0;
            $interact = ListeningHistory::whereDate('created_at', '=', $day->format('Y-m-d'))->get();
            $user_cache = [];
            foreach ($interact as $item) {
                if (!in_array($item->user_id, $user_cache)) {
                    $value = $value + 1;
                    array_push($user_cache, $item->user_id);
                }
            }

            array_push($data, $value);
        }
        return response()->json($data);
    }

    public function ratioUserType(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $author_count = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'Admin')->toArray()
        )->count();
        $user_count = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'User')->toArray()
        )->count();

        return response()->json([$author_count, $user_count]);
    }

    public function ratioSongType(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $author_count = Song::where('status', 'accept')->count();
        $user_count = Song::where('status', '!=', 'accept')->count();

        return response()->json([$author_count, $user_count]);
    }

    public function ratioMVType(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $author_count = MV::where('status', 'accept')->count();
        $user_count = MV::where('status', '!=', 'accept')->count();

        return response()->json([$author_count, $user_count]);
    }

    public function getUserCreateToday(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $users = User::whereDate('created_at', '=', now()->format('Y-m-d'))->get();
        $count = count($users);

        $format_data = [];
        foreach ($users as $user) {
            array_push($format_data, [
                'avatar' => $user->avatar,
                'user_name' => $user->user_name,
                'role_name' => $user->user_has_role->role->name,
                'status' => $user->status,
                'date_create' => $user->created_at
            ]);
        }

        return response()->json([
            'users' => $format_data,
            'count' => $count
        ]);
    }

    public function getSongCreateToday(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $songs = Song::whereDate('created_at', '=', now()->format('Y-m-d'))->get();
        $count = count($songs);

        $format_data = [];
        foreach ($songs as $song) {
            array_push($format_data, [
                'avatar' => $song->image,
                'title' => $song->title,
                'status' => $song->status,
                'artists' => $song->artists,
                'date_create' => $song->created_at,
            ]);
        }

        return response()->json([
            'songs' => $format_data,
            'count' => $count
        ]);
    }

    public function getMVCreateToday(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $songs = MV::whereDate('created_at', '=', now()->format('Y-m-d'))->get();
        $count = count($songs);

        $format_data = [];
        foreach ($songs as $song) {
            array_push($format_data, [
                'id' => $song->id,
                'avatar' => $song->image,
                'title' => $song->title,
                'status' => $song->status,
                'user_avatar' => $song->user->avatar,
                'user_name' => $song->user->user_name,
                'date_create' => $song->created_at,
            ]);
        }

        return response()->json([
            'songs' => $format_data,
            'count' => $count
        ]);
    }

    public function getFeaturedUser(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $dataformat = [];
        $users = User::all();
        foreach ($users as $user) {
            $data = Activity::where('causer_id', $user->id)->whereDate('created_at', '=', now()->format('y-m-d'))->count();
            array_push($dataformat, [
                'user_id' => $user->id,
                'user_name' => $user->user_name,
                'avatar' => $user->avatar,
                'role_name' => $user->user_has_role->role->name,
                'value' => $data
            ]);
        }

        usort($dataformat, function ($a, $b) {
            return $b['value'] <=> $a['value'];
        });
        return $dataformat;
    }

    public function getFeaturedMV(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $dataformat = [];
        $Songs = MV::all();
        foreach ($Songs as $song) {
            $data = Activity::where('subject_id', $song->id)->whereDate('created_at', '=', now()->format('Y-m-d'))->whereIn('subject_type', ['App\Models\InteractSong', 'App\Models\ListeningHistory'])->count();
            array_push($dataformat, [
                'user_id' => $song->id,
                'user_name' => $song->title,
                'avatar' => $song->image,
                'value' => $data
            ]);
        }

        usort($dataformat, function ($a, $b) {
            return $b['value'] <=> $a['value'];
        });
        return $dataformat;
    }



    public function getFeaturedSong(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $dataformat = [];
        $Songs = Song::all();
        foreach ($Songs as $song) {
            $data = Activity::where('subject_id', $song->id)->whereDate('created_at', '=', now()->format('Y-m-d'))->whereIn('subject_type', ['App\Models\InteractSong', 'App\Models\ListeningHistory'])->count();
            array_push($dataformat, [
                'user_id' => $song->id,
                'user_name' => $song->title,
                'avatar' => $song->image,
                'artists' => $song->artists,
                'value' => $data
            ]);
        }

        usort($dataformat, function ($a, $b) {
            return $b['value'] <=> $a['value'];
        });
        return $dataformat;
    }

    public function getDetailMnager(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $song_count = Song::where('status', 'accept')->count();
        $usercount = User::where('status', 'enable')->count();
        $MV_count = MV::where('status', 'accept')->count();
        return response()->json([
            'count_song' => $song_count,
            'count_user' => $usercount,
            'count_mv' => $MV_count
        ]);
    }
}
