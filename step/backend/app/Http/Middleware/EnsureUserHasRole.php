<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, string $role)
    {

        $user = DB::table('people')
            ->join('roles', 'roles.id', '=', 'role_id')
            ->where('people.id', '=', auth()->user()->id)           
            ->first();

        $role= $user->name;
        
        $table="jobseeker|admin|recruiter";
            
        echo in_array($role,[explode('|',$table)]);
        
        if (auth()->user()->role()->whereIn('name', explode('|', $role))->exists()) {

            return $next($request);
        }
        abort(403, 'No authorized ');
    }
}
