<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    
    public function index() {
        // get static data instead of loading from an external API
        // what we should try to loadtest is nginx and app instances
        $data = json_decode(file_get_contents(public_path('/static-data/techcrunch-top-articles-2022-07-07.json')));

        // return the view
        return view('start', compact($data));
    }
}
