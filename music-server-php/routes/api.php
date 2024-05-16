<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AutherController;
use App\Http\Controllers\api\MusicController;
use App\Http\Controllers\api\MVController;
use App\Http\Controllers\api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/auth')->controller(AutherController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
    Route::post('change-password', 'changePassword')->middleware('auth:sanctum');
});
Route::prefix('/user')->controller(UserController::class)->group(function () {
    Route::get('/', 'index')->middleware('auth:sanctum');
    Route::post('change-avatar', 'setAvatar')->middleware('auth:sanctum');
    Route::post('change-background', 'setBackground')->middleware('auth:sanctum');
});
Route::prefix('/music')->controller(MusicController::class)->group(function () {
    Route::post('/validate_audio', 'validateFileAudio')->middleware('auth:sanctum');
    Route::post('/validate_image', 'validateFileArtwork')->middleware('auth:sanctum');
    Route::post('/validate_lyric', 'validateFileLyric')->middleware('auth:sanctum');
    Route::post('/validate_thumbnail', 'validateFileThumbnail')->middleware('auth:sanctum');
    Route::post('/create', 'create')->middleware('auth:sanctum');
    Route::post('/getsongupload', 'getSongUpload')->middleware('auth:sanctum');
    Route::post('/getsongdetail', 'getSongDetail')->middleware('auth:sanctum');
    Route::post('/editsongdetail', 'editSongDetail')->middleware('auth:sanctum');
    Route::get('/getsong/{name_audio}', 'getSong');
    Route::post('/changestatus', 'statusChange')->middleware('auth:sanctum');
    Route::get('/song-hot', 'getHotSong');
    Route::get('/new-song', 'getNewSongs');
});

Route::prefix('/mv')->controller(MVController::class)->group(function () {
    Route::post('/validate_mv', 'validateMV')->middleware('auth:sanctum');
    Route::post('/create', 'store')->middleware('auth:sanctum');
    Route::post('/edit-mv-detail', 'update')->middleware('auth:sanctum');
    Route::post('/changestatus', 'changeStatus')->middleware('auth:sanctum');
    Route::get('get-new-mv', 'getNewMV');
    Route::get('/getmv/{name_audio}', 'getMV');
    Route::get('get-mv-upload', 'getMvUpload')->middleware('auth:sanctum');
    route::get('get-mv-detail/{id}', 'getMVDetail')->middleware('auth:sanctum');
});
