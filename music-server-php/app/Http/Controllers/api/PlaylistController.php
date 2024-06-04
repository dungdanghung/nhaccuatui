<?php

namespace App\Http\Controllers\api;

use App\Helper\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\PlayList;
use App\Models\Song;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;


class PlaylistController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('add_playlist') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $rules = [
            'song_id' => 'required|integer'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        $song = Song::where('id', $request->song_id)->first();
        if (empty($song)) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            $check = PlayList::where('user_id', $user->id)->where('song_id', $song->id)->first();
            if (empty($check)) {
                PlayList::create([
                    'user_id' => auth()->user()->id,
                    'song_id' => $song->id
                ]);
            } else {
                $check->delete();
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }

    public function getPlaylist()
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('add_playlist') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $format = [];
        $playlist = PlayList::where('user_id', $user->id)->get();
        foreach ($playlist as $item) {
            if ($item->song->status == "accept") {
                array_push($format, $item->song);
            }
        }
        return response()->json($format);
    }

    public function remove(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('add_playlist') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $rules = [
            'playlist_id' => 'required|integer'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            $playlist = PlayList::where('user_id', $user->id)->where('song_id', $request->playlist_id)->first();
            if (!empty($playlist)) {
                $playlist->delete();
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }
}
