<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('users')->delete();
        $user = User::create([
            'name'=>'user',
            'alias'=>'user',
            'email'=>'user@mail.com',
            'password'=>bcrypt('s0p0rt3'),
            'active'=>true,
        ]);
        $role = Role::where('name', '=', 'admin')->get()->first();
        $user->attachRole($role);
    }
}
