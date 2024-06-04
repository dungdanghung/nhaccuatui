<?php

namespace App\Http\Controllers\api;
// pbzh gdfo xfqk jgta
use getID3;
use Carbon\Carbon;
use App\Mail\MyMail;
use App\Models\Song;
use App\Helper\Reply;
use App\Models\HotSong;
use App\Models\InteractSong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;


class MusicController extends Controller
{
    public function validateFileAudio(Request $request)
    {
        $request->validate([
            'audio' => 'required|file|mimes:mp3|max:51200',
        ]);

        $file = $request->file('audio');
        $getID3 = new getID3();

        $fileInfo = $getID3->analyze($file->getPathname());

        if ($fileInfo['fileformat'] !== 'mp3' || !isset($fileInfo['audio']) || $fileInfo['filesize'] >= 52428800) {
            return Reply::error("File không phải là MP3 hoặc không thể xác thực");
        }
        return Reply::success();
    }

    public function validateFileArtwork(Request $request)
    {
        $rules = [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4048',
        ];

        $validator = Validator::make($request->only('image'), $rules);
        $validator->after(function ($validator) use ($request) {
            $image = $request->file('image');
            $dimensions = getimagesize($image);

            $Width = 1280;
            $Height = 720;
            $min = 600;

            if ($dimensions[0] > $Width || $dimensions[1] > $Height || $dimensions[0] < $min || $dimensions[1] < $min) {
                $validator->errors()->add('image', 'The image dimensions must not exceed 3000x3000 pixels.');
            }
        });


        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }


        return Reply::success();
    }

    public function validateFileLyric(Request $request)
    {
        $rules = [
            'lyric' => 'required|max:50000',
        ];
        $validator = Validator::make($request->only('lyric'), $rules);

        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }


        return Reply::success();
    }


    public function create(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('upload_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'language' => 'required|max:2',
            'title' => 'required',
            'artists' => "required|array|min:1",
            'primary_genre' => 'required',
            'secondary_genre' => 'required',
            'composition_copyright' => 'required',
            // 'record_laber_name' => 'required',
            'originaly_released' => 'required|date_format:Y-m-d',
            'audio' => 'required|file|mimes:mp3|max:51200',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4048',
            'lyric' => 'max:50000',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        DB::beginTransaction();
        try {
            $input = $request->only(['language', 'title', 'primary_genre', 'secondary_genre', 'composition_copyright', 'record_laber_name']);
            $input['artists'] = json_encode($request->artists);
            $nameAudio = auth()->user()->username . time() . '.' . $request->file('audio')->getClientOriginalExtension();
            Storage::disk('local')->putFileAs('uploads/song', $request->file('audio'), $nameAudio);
            Storage::disk('public')->putFileAs('uploads/song', $request->file('audio'), $nameAudio);

            $nameImage = auth()->user()->username . time() . '.' . $request->file('image')->getClientOriginalExtension();
            Storage::disk('local')->putFileAs('uploads/image/1280x720', $request->file('image'), $nameImage);
            Storage::disk('public')->putFileAs('uploads/image/1280x720', $request->file('image'), $nameImage);

            $imageResize = Image::make($request->file('image'));
            $image400x400 = $imageResize->resize(336, 188);
            $image400x400->save(public_path('uploads\image\336x188\\' . $nameImage));
            $image400x400->save(storage_path('app\uploads\image\336x188\\' . $nameImage));

            $image300x300 = $imageResize->resize(672, 376);
            $image300x300->save(public_path('uploads\image\672x376\\' . $nameImage));
            $image300x300->save(storage_path('app\uploads\image\672x376\\' . $nameImage));

            $image300x300 = $imageResize->resize(168, 94);
            $image300x300->save(public_path('uploads\image\168x94\\' . $nameImage));
            $image300x300->save(storage_path('app\uploads\image\168x94\\' . $nameImage));

            if ($request->lyric) {
                $nameLyric = auth()->user()->username . time() . '.' . $request->file('lyric')->getClientOriginalExtension();
                Storage::disk('local')->putFileAs('uploads/lyric', $request->file('lyric'), $nameLyric);
                Storage::disk('public')->putFileAs('uploads/lyric', $request->file('lyric'), $nameLyric);
                $input['lyric_file'] = $nameLyric;
            }

            $input['originaly_released'] = Carbon::parse($request->originaly_released);
            $input['audio'] = $nameAudio;
            $input['image'] = $nameImage;
            $input['thumbnail'] = $nameImage;
            $input['user_id'] = auth()->user()->id;

            Song::create($input);
            Mail::to('dunggsx@gmail.com')->send(new MyMail("upload", 'yêu cầu phát hành bài hát từ ' . auth()->user()->user_name));
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }

        return Reply::success();
    }

    public function getSongUpload(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        try {
            $songs = Song::orderBy('created_at', 'desc')
                ->limit(30)
                ->get();
        } catch (\Throwable $th) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        return response()->json($songs);
    }

    public function getSongDetail(Request $request)
    {
        $rules = [
            'id' => 'required|integer',
        ];

        $is_admin = auth()->user()->hasRole('Admin');

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $song = Song::where('id', $request->id)->first();
        if (empty($song)) {
            return Reply::error(__('messages.something_went_wrong'));
        } else {
            if ($song->status != "accept") {
                if (!$is_admin || $song->user_id != auth()->user()->id) {
                    return [];
                }
            }
        }

        return response()->json($song);
    }

    public function editSongDetail(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'language' => 'required|max:2',
            'title' => 'required',
            'artists' => "required|array|min:1",
            'primary_genre' => 'required',
            'secondary_genre' => 'required',
            'composition_copyright' => 'required',
            'record_laber_name' => 'required',
            'originaly_released' => 'required|date_format:Y-m-d',
            'id' => 'required|integer',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $song = Song::where('id', $request->id)->first();
        if (empty($song)) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            $input = $request->only(['language', 'title', 'artists', 'primary_genre', 'secondary_genre', 'composition_copyright', 'record_laber_name', 'originaly_released']);
            $song->update($input);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }

        return Reply::success();
    }


    public function getSong(Request $request)
    {
        return response()->file(public_path("uploads/song/" . $request->name_audio));
    }

    public function getLyric(Request $request)
    {
        return response()->file(public_path("uploads/lyric/" . $request->name_lyric));
    }

    public function statusChange(Request $request)
    {
        $is_admin = auth()->user()->hasRole('Admin');
        if (!auth()->user()->hasPermissionTo('manager_song') || !$is_admin) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'id' => 'required|integer',
            'status' => 'required|in:Approved,Pending,Cancelled',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $song = Song::where('id', $request->id)->first();
        if (empty($song)) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            if ($request->status == "Approved") {
                $song->update([
                    'status' => "accept"
                ]);
            } else if ($request->status == "Pending") {
                $song->update([
                    'status' => "pending"
                ]);
            } else {
                $song->update([
                    'status' => "canceled"
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }

    public function getHotSong(Request $request)
    {
        $user = auth()->user();
        $songs = HotSong::orderBy('value', 'desc')->limit(20)->get();
        if (count($songs) == 0) {
            $songs = Song::where('status', 'accept')->orderBy('heart', 'desc')->limit(20)->get();
        } else {
            $filter_songs = [];
            foreach ($songs as $song) {
                if ($song->song->status == "accept") {
                    array_push($filter_songs, $song);
                }
            }
            $songs = $filter_songs;
        }
        $format_songs = [];
        foreach ($songs as $song) {
            $interact = $song->interact_heart->where('song_id', $song->id)->where('user_id', $user->id)->where('type', 'add_heart_song')->first();
            $checkPlaylist = $song->playlist->where('song_id', $song->id)->where('user_id', $user->id)->first();
            array_push($format_songs, [
                'id' => $song->id,
                'title' => $song->title,
                'artists' => $song->artists,
                'audio' => $song->audio,
                'image' => $song->image,
                'heart' => $song->heart,
                'check_heart' => $interact ? true : false,
                'check_playlist' => $checkPlaylist ? true : false,
                'lyric_file' => $song->lyric_file
            ]);
        }
        return response()->json($format_songs);
    }

    public function getNewSongs(Request $request)
    {
        $songs = Song::whereDate('originaly_released', '<=', now()->format('Y-m-d'))
            ->where('status', 'accept')
            ->orderBy('originaly_released', 'desc')
            ->limit(15)
            ->get();

        $format_songs = [];
        $format_songs_item = [];
        foreach ($songs as $song) {
            array_push($format_songs_item, [
                'id' => $song->id,
                'title' => $song->title,
                'artists' => $song->artists,
                'audio' => $song->audio,
                'image' => $song->image,
                'heart' => $song->heart,
                'lyric_file' => $song->lyric_file
            ]);
            if (count($format_songs_item) >= 3) {
                array_push($format_songs, $format_songs_item);
                $format_songs_item = [];
            }
        }
        return response()->json($format_songs);
    }

    public function zingChart()
    {
        $user = auth()->user();
        $songs = HotSong::orderBy('value', 'desc')->limit(100)->get();
        if (count($songs) == 0) {
            $songs = Song::where('status', 'accept')->orderBy('heart', 'desc')->limit(20)->get();
        } else {
            $filter_songs = [];
            foreach ($songs as $song) {
                if ($song->song->status == "accept") {
                    array_push($filter_songs, $song);
                }
            }
            $songs = $filter_songs;
        }
        $format_songs = [];
        foreach ($songs as $song) {
            $interact = $song->interact_heart->where('song_id', $song->id)->where('user_id', $user->id)->where('type', 'add_heart_song')->first();
            $checkPlaylist = $song->playlist->where('song_id', $song->id)->where('user_id', $user->id)->first();
            array_push($format_songs, [
                'id' => $song->id,
                'title' => $song->title,
                'artists' => $song->artists,
                'audio' => $song->audio,
                'image' => $song->image,
                'heart' => $song->heart,
                'check_heart' => $interact ? true : false,
                'check_playlist' => $checkPlaylist ? true : false,
                'lyric_file' => $song->lyric_file
            ]);
        }
        return response()->json($format_songs);
    }

    public function addHeart(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('view_song') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        DB::beginTransaction();
        try {
            $song = Song::where('id', $request->song_id)->first();
            if (!empty($song)) {
                $interact = $song->interact_heart->where('song_id', $song->id)->where('user_id', $user->id)->where('type', 'add_heart_song')->first();
                $song->update([
                    'heart' => $interact ? $song->heart - 1 : $song->heart + 1
                ]);
                if ($interact) {
                    $interact->delete();
                } else {
                    InteractSong::create([
                        'user_id' => $user->id,
                        'song_id' => $song->id,
                        'type' => 'add_heart_song'
                    ]);
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
    }

    public function getMySongUpload()
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('view_song') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $songs = Song::where('user_id', $user->id)->where('status', 'accept')->get();
        return response()->json($songs);
    }

    public function search($value)
    {
        if ($value != '') {
            $song = Song::where('title', 'like', '%' . $value . '%')->orderBy('heart', 'desc')->limit(5)->get(['title']);
            return response()->json($song);
        }
    }

    public function searchSong($value)
    {
        if ($value != '') {
            $song = Song::where('title', 'like', '%' . $value . '%')->orderBy('heart', 'desc')->limit(5)->get();



            return response()->json($song);
        }
    }
}
