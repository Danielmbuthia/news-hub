<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = User::create($request->validated());
            $token = $user->createToken($request->email)->plainTextToken;

            DB::commit();
            return response()->json(['message' => 'User created successfully', 'data' => ['token' => $token, 'user' => $user]], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage(), 'data' => []], 400);
        }
    }
    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if ($user && Hash::check($request->password, $user->password)) {
                $token = $user->createToken($request->email)->plainTextToken;
                return response()->json(['message' => 'User logged in successfully', 'data' => ['token' => $token, 'user' => $user]], 200);
            }
            return response()->json(['message' => 'Invalid credentials', 'data' => []], 400);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage(), 'data' => []], 400);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'User logged out successfully', 'data' => []], 200);
    }
}
