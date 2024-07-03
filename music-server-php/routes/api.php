<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AutherController;
use App\Http\Controllers\api\ManagerController;
use App\Http\Controllers\api\MusicController;
use App\Http\Controllers\api\MVController;
use App\Http\Controllers\api\PlaylistController;
use App\Http\Controllers\api\PostController;
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
    Route::get('/getUser/{id}', 'getUserByID');
    Route::post('change-avatar', 'setAvatar')->middleware('auth:sanctum');
    Route::post('change-background', 'setBackground')->middleware('auth:sanctum');
    Route::post('update', 'update')->middleware('auth:sanctum');
    Route::post('/getuserupload', 'getUserUpload')->middleware('auth:sanctum');
});
Route::prefix('/music')->controller(MusicController::class)->group(function () {
    Route::post('/validate_audio', 'validateFileAudio')->middleware('auth:sanctum');
    Route::post('/validate_image', 'validateFileArtwork')->middleware('auth:sanctum');
    Route::post('/validate_lyric', 'validateFileLyric')->middleware('auth:sanctum');
    Route::post('/validate_thumbnail', 'validateFileThumbnail')->middleware('auth:sanctum');
    Route::post('/create', 'create')->middleware('auth:sanctum');
    Route::post('/getsongupload', 'getSongUpload')->middleware('auth:sanctum');
    Route::post('/getsongdetail', 'getSongDetail')->middleware('auth:sanctum');
    Route::post('/get-song-detail-manager', 'getMediaDetail')->middleware('auth:sanctum');
    Route::post('/editsongdetail', 'editSongDetail')->middleware('auth:sanctum');
    Route::get('/getsong/{name_audio}', 'getSong');
    Route::post('/changestatus', 'statusChange')->middleware('auth:sanctum');
    Route::get('/song-hot', 'getHotSong')->middleware('auth:sanctum');
    Route::get('/new-song', 'getNewSongs');
    Route::get('/zingchart', 'zingChart')->middleware('auth:sanctum');
    Route::post('/add-heart', 'addHeart')->middleware('auth:sanctum');
    Route::get('/my-song-upload', 'getMySongUpload')->middleware('auth:sanctum');
    Route::get('/search/{value}', 'search');
    Route::get('/searchManager/{value}', 'searchMediaUpload');
    Route::get('/search-song/{value}', 'searchSong');
    Route::get('/get-lyric/{name_lyric}', 'getLyric');
    Route::post('add_view', 'addView')->middleware('auth:sanctum');
    Route::get('song_history', 'getListHistory')->middleware('auth:sanctum');
    Route::post('update-song-interact', 'updateHotSong');
<<<<<<< HEAD
});

Route::prefix('/manager')->controller(ManagerController::class)->group(function () {
    Route::get('/getChartUser', 'getChartUser')->middleware('auth:sanctum');
    Route::get('/getChartSong', 'getChartSong')->middleware('auth:sanctum');
    Route::get('/getChartMV', 'getChartMV')->middleware('auth:sanctum');

    Route::get('/getChartSongAccept', 'getSongAccept')->middleware('auth:sanctum');
    Route::get('/getChartMVAccept', 'getMVAccept')->middleware('auth:sanctum');

    Route::get('/getChartUserOnline', 'getChartUserOnline')->middleware('auth:sanctum');
    Route::get('/getRatioUser', 'ratioUserType')->middleware('auth:sanctum');
    Route::get('/getRatioSong', 'ratioSongType')->middleware('auth:sanctum');
    Route::get('/getRatioMV', 'ratioMVType')->middleware('auth:sanctum');


    Route::get('/getNewUser', 'getUserCreateToday')->middleware('auth:sanctum');
    Route::get('/getNewSong', 'getSongCreateToday')->middleware('auth:sanctum');
    Route::get('/getNewMV', 'getMVCreateToday')->middleware('auth:sanctum');


    Route::get('/getFeaturedUser', 'getFeaturedUser')->middleware('auth:sanctum');
    Route::get('/getFeaturedSong', 'getFeaturedSong')->middleware('auth:sanctum');
    Route::get('/getFeaturedMV', 'getFeaturedMV')->middleware('auth:sanctum');

    Route::get('/getCountDetail', 'getDetailMnager')->middleware('auth:sanctum');
=======
>>>>>>> a96d91a35bda4d9be7c428a31f30fbe985a5bd5c
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

Route::prefix('/post')->controller(PostController::class)->group(function () {
    Route::post('/create', 'store')->middleware('auth:sanctum');
    Route::get('/get-posts/{user_id}', 'getPosts')->middleware('auth:sanctum');
    Route::post('/add-heart', 'addHeart')->middleware('auth:sanctum');
    Route::post('/add-comment', 'storeComment')->middleware('auth:sanctum');
    Route::get('/get-comment/{id}/{type}', 'getComments')->middleware('auth:sanctum');
    Route::post('/delete-comment', 'deleteComment')->middleware('auth:sanctum');
});

Route::prefix('/playlist')->controller(PlaylistController::class)->group(function () {
    Route::post('/create', 'store')->middleware('auth:sanctum');
    Route::get('/get-playlist', 'getPlaylist')->middleware('auth:sanctum');
    Route::post('/remove', 'remove')->middleware('auth:sanctum');
});
