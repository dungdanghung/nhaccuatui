<?php

namespace App\Helper;

class Reply
{

    /** Return success response
     * @param int $message
     */

    public static function success()
    {
        return response()->json([
            'success' => true,
            'msg' => __('messages.successful'),
        ], 200);
    }

    /** Return success response with Message
     * @param string $message
     */

    public static function successWithMessage($message, $status = 200)
    {
        return response()->json([
            'success' => true,
            'msg' => $message
        ], $status);
    }

    public static function successWithData($data = [], $message, $status = 200)
    {
        $response = [
            'success' => true,
            'msg' =>  $message,
            'data' => $data,
        ];
        return response()->json($response, $status);
    }
    /**
     * @param string $message
     * @param null $error_name
     * @param array $errorData
     */
    public static function error($message, $status = 400)
    {
        return response()->json([
            'success' => 'fail',
            'msg' => $message
        ], $status);
    }
}
