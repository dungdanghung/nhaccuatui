<?php

namespace App\Http\Controllers\api;

use App\Models\Post;
use App\Models\User;
use App\Helper\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notifications\PostInteract;
use function Laravel\Prompts\error;
use App\Http\Controllers\Controller;
use App\Models\CommentPost;
use App\Models\InteractSong;
use App\Models\Song;
use Illuminate\Support\Facades\Storage;

use Spatie\Activitylog\Models\Activity;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('create_post')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'text_content' => 'string',
            // 'file_song' => 'file|mimes:mp3|max:51200',
            // 'status' => 'accept',
            // 'file_image' => 'image|mimes:jpeg,png,jpg,gif|max:4048',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        DB::beginTransaction();
        try {
            $nameAudio = '';
            $nameImage = '';
            if ($request->file('file_song')) {
                $nameAudio = auth()->user()->username . time() . '.' . $request->file('file_song')->getClientOriginalExtension();
                Storage::disk('local')->putFileAs('uploads/song', $request->file('file_song'), $nameAudio);
                Storage::disk('public')->putFileAs('uploads/song', $request->file('file_song'), $nameAudio);
            }
            if ($request->file('file_image')) {
                $nameImage = auth()->user()->username . time() . '.' . $request->file('file_image')->getClientOriginalExtension();
                Storage::disk('local')->putFileAs('uploads/image/1280x720', $request->file('file_image'), $nameImage);
                Storage::disk('public')->putFileAs('uploads/image/1280x720', $request->file('file_image'), $nameImage);
            }

            Post::create([
                'user_id' => auth()->user()->id,
                'text_content' => !empty($request->text_content) ? $request->text_content : "",
                'file_song' => $nameAudio,
                'file_image' => $nameImage,
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }


    public function getPosts($user_ID)
    {
        $user = User::where('id', $user_ID)->where('status', 'enable')->first();
        if (!$user->hasPermissionTo('view_post') || $user->status == "disable" || empty($user_ID)) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $activitys = Activity::where('causer_id', $user->id)->where('event', 'created')->whereIn('subject_type', ['App\Models\Song', 'App\Models\Post'])->orderBy('created_at', 'desc')->get();

        $format_posts = [];
        foreach ($activitys as $post) {
            if ($post['subject_type'] == 'App\Models\Post') {
                $data = Post::where('id', $post->properties['attributes']['id'])->first();
            } else $data = Song::where('id', $post->properties['attributes']['id'])->first();


            if ($post['subject_type'] == 'App\Models\Post') {
                $check_post = InteractSong::where('song_id', $data['id'])->where('type', 'add_heart_post')->where('user_id', $user->id)->first();
                array_push($format_posts, [
                    'id' => $data['id'],
                    'audio' => $data['file_song'],
                    'text_content' => $data['text_content'],
                    'type' => $data['file_song'] ? 'post_media' : 'post',
                    'image' => $data['file_image'],
                    'create_time' => $data['created_at'],
                    'avatar' => $user->avatar,
                    'user_name' => $user->user_name,
                    'heart' => $data['heart'],
                    'check_heart' => $check_post ? true : false
                ]);
            } else if ($data['status'] == 'accept' && $post['subject_type'] == 'App\Models\Song') {
                $check_post = InteractSong::where('song_id', $data['id'])->where('type', 'add_heart_song')->where('user_id', $user->id)->first();
                array_push($format_posts, [
                    'id' => $data['id'],
                    'type' => 'media',
                    'audio' => $data['audio'],
                    'artists' => $data['artists'],
                    'image' => $data['image'],
                    'create_time' => $data['created_at'],
                    'avatar' => $user->avatar,
                    'user_name' => $user->user_name,
                    'heart' => $data['heart'],
                    'check_heart' => $check_post ? true : false
                ]);
            }
        }
        return response()->json($format_posts);
    }


    public function addHeart(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('view_post') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        DB::beginTransaction();
        try {
            if ($request->type == 'post') {
                $post = Post::where('id', $request->post_id)->first();
                if (!empty($post)) {
                    $interact = $post->interact_heart->where('song_id', $post->id)->where('type', 'add_heart_post')->where('user_id', $user->id)->first();
                    $post->update([
                        'heart' => $interact ? $post->heart - 1 : $post->heart + 1
                    ]);
                    if ($interact) {
                        $interact->delete();
                    } else {
                        InteractSong::create([
                            'user_id' => $user->id,
                            'song_id' => $post->id,
                            'type' => 'add_heart_post'
                        ]);
                    }
                }
            } else if ($request->type == 'song') {
                $song = Song::where('id', $request->post_id)->first();
                if (!empty($song)) {
                    $interact = $song->interact_heart->where('song_id', $song->id)->where('type', 'add_heart_song')->where('user_id', $user->id)->first();
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
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
    }

    public function storeComment(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('add_comment') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        $rules = [
            'text_content' => 'required|string',
            'post_id' => 'required|integer'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        // $permission = Permission::create(['name' => 'add_comment', 'guard_name' => 'web']);
        // $permission->assignRole('Admin');
        // $permission->assignRole('User');
        // $permission->assignRole('Author');
        // $user->givePermissionTo('add_comment');
        $post = Post::where('id', $request->post_id)->first();
        if (empty($post)) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            CommentPost::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'description' => $request->text_content
            ]);
            $post->update([
                'count_of_comment' => $post->count_of_comment + 1
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }

    public function getComments($id, $type)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('view_comment') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        if (!$id) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $post = Post::where('id', $id)->first();
        if (empty($post)) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $format_comments = [];
        foreach ($post->comments as $comment) {
            array_push($format_comments, [
                'id' => $comment->id,
                'user_id' => $comment->user_id,
                'text_content' => $comment->description,
                'user_name' => $comment->user->user_name,
                'avatar' => $comment->user->avatar,
                'create_time' => $comment->created_at
            ]);
        }
        return response()->json($format_comments);
    }

    public function deleteComment(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('delete_comment') || $user->status == "disable") {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'comment_id' => 'required|integer'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $comment = CommentPost::where('id', $request->comment_id)->first();
        if (empty($comment)) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        DB::beginTransaction();
        try {
            $comment->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }
}
