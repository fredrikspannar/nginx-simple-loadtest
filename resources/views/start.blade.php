@extends('layouts.app')

@section('content')

    <h1>NewsAPI - Techcrunch top stories (static data from 2022-07-07)</h1>

    @foreach(collect($data->articles)->chunk(2) as $row)
        <div class="row">
        
            @foreach($row as $news)
                <div class="col-6">
                    <div class="card">
                      <div class="card-body">
                        <p><img src="{{$news->urlToImage}}" /></p>
                        <h5>{{$news->title}}</h5>
                        <h6 class="text-muted">{{$news->description}}</h6>

                      </div>
                    </div>
                </div>
            @endforeach

        </div>
    @endforeach


@endsection