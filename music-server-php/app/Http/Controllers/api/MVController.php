<?php

namespace App\Http\Controllers\api;

use getID3;
use App\Models\MV;
use Carbon\Carbon;
use App\Helper\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyMail;
use App\Models\HotMv;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MVController extends Controller
{

    public function validateMV(Request $request)
    {
        $request->validate([
            'video' => 'required|file|mimes:mp4|max:312000',
        ]);

        $file = $request->file('video');
        $getID3 = new getID3();
        $fileInfo = $getID3->analyze($file->getPathname());

        if ($fileInfo['fileformat'] !== 'mp4' || !isset($fileInfo['audio'])) {
            return Reply::error("File không phải là MP4 hoặc không thể xác thực");
        }
        return Reply::success();
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('upload_mv')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'title' => 'required',
            'composition_copyright' => 'required',
            'originaly_released' => 'required|date_format:Y-m-d',
            'video' => 'required|file|mimes:mp4',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4048',
            // 'discription' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        DB::beginTransaction();
        try {
            $input = $request->only(['title', 'composition_copyright']);

            $nameVideo = auth()->user()->username . time() . '.' . $request->file('video')->getClientOriginalExtension();
            Storage::disk('local')->putFileAs('uploads/mv', $request->file('video'), $nameVideo);
            Storage::disk('public')->putFileAs('uploads/mv', $request->file('video'), $nameVideo);

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

            $input['originaly_released'] = Carbon::parse($request->originaly_released);
            $input['video'] = $nameVideo;
            $input['image'] = $nameImage;
            $input['user_id'] = auth()->user()->id;
            $new_mv = MV::create($input);
            HotMv::create([
                'mv_id' => $new_mv->id,
            ]);
            Mail::to('dunggsx@gmail.com')->send(new MyMail("upload", 'yêu cầu phát hành MV từ ' . auth()->user()->user_name));
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }

        return Reply::success();
    }

    public function update(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_mv')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }
        $rules = [
            'title' => 'required',
            'composition_copyright' => 'required',
            'originaly_released' => 'required|date_format:Y-m-d',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        $MV = MV::where('id', $request->id)->first();
        if (empty($MV)) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            $input = $request->only(['title', 'composition_copyright', 'discription']);
            $input['originaly_released'] = Carbon::parse($request->originaly_released);
            $MV->update($input);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }

        return Reply::success();
    }

    public function changeStatus(Request $request)
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

        $MV = MV::where('id', $request->id)->first();
        if (empty($MV)) {
            return Reply::error(__('messages.something_went_wrong'));
        }
        DB::beginTransaction();
        try {
            if ($request->status == "Approved") {
                $MV->update([
                    'status' => "accept"
                ]);
            } else if ($request->status == "Pending") {
                $MV->update([
                    'status' => "pending"
                ]);
            } else {
                $MV->update([
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

    public function destroy(Request $request)
    {
        $MV = MV::where('id', $request->id)
            ->where('user_id', auth()->user()->id)
            ->first();

        if (!auth()->user()->hasPermissionTo('manager_mv')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        } else {
            if (empty($MV)) {
                return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
            }
        }
        DB::beginTransaction();
        try {
            $MV->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }

    public function getNewMV(Request $request)
    {
        $mv = MV::whereDate('originaly_released', '<=', now()->format('Y-m-d'))
            // ->where('status', 'accept')
            ->orderBy('originaly_released', 'desc')
            ->limit(15)
            ->get();

        $format_mv = [];
        $format_mv_item = [];
        foreach ($mv as $item) {
            array_push($format_mv, [
                'id' => $item->id,
                'title' => $item->title,
                'video' => $item->video,
                'image' => $item->image,
                'heart' => $item->heart,
            ]);
            // if (count($format_mv_item) >= 3) {
            //     array_push($format_mv, $format_mv_item);
            //     $format_mv_item = [];
            // }
        }
        return response()->json($format_mv);
    }

    public function getMvUpload(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        try {
            $mv = MV::orderBy('created_at', 'desc')
                ->limit(30)
                ->get();
        } catch (\Throwable $th) {
            return Reply::error(__('messages.something_went_wrong'));
        }

        return response()->json($mv);
    }


    public function getMV(Request $request)
    {
        return response()->file(public_path("uploads/mv/" . $request->name_audio));
    }

    public function getMVDetail($id)
    {
        if (!auth()->user()->hasPermissionTo('manager_song')) {
            return Reply::error(__('messages.you_do_not_have_the_right_to_use_this_feature'));
        }

        // $rules = [
        //     'id' => 'required|integer',
        // ];

        $is_admin = auth()->user()->hasRole('Admin');

        // $validator = Validator::make($id, $rules);
        // if ($validator->fails()) {
        //     return Reply::error(__('messages.something_went_wrong'));
        // }

        $mv = MV::where('id', $id)->first();
        if (empty($mv)) {
            return Reply::error(__('messages.something_went_wrong'));
        } else {
            if ($mv->status != "accept") {
                if (!$is_admin || $mv->user_id != auth()->user()->id) {
                    return [];
                }
            }
        }

        return response()->json($mv);
    }
}
