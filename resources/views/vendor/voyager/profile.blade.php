@extends('voyager::master')

@section('css')
    <style>
        .user-email {
            font-size: .85rem;
            margin-bottom: 1.5em;
        }
    </style>
@stop

@section('content')
    <div style="background-size:cover; background-image: url({{ Voyager::image( Voyager::setting('admin.bg_image'), voyager_asset('/images/bg.jpg')) }}); background-position: center center;position:absolute; top:0; left:0; width:100%; height:300px;"></div>
    <div style="height:160px; display:block; width:100%"></div>
    <div style="position:relative; z-index:9; text-align:center;">
        <img src="<?php echo url('/')?>\storage\{{ app('VoyagerAuth')->user()->avatar }}"
             class="avatar"
             style="border-radius:50%; width:150px; height:150px; border:5px solid #fff;"
             alt="{{ app('VoyagerAuth')->user()->name }} avatar">
        <h4>{{ ucwords(app('VoyagerAuth')->user()->name) }}</h4>
        <div class="user-email text-muted">{{ ucwords(app('VoyagerAuth')->user()->email) }}</div>
        <p>{{ app('VoyagerAuth')->user()->bio }}</p>
        <a href="{{ route('voyager.users.edit', app('VoyagerAuth')->user()->getKey()) }}" class="btn btn-primary">{{ __('voyager::profile.edit') }}</a>
    </div>
@stop
