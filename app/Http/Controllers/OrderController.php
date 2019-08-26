<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\Company;
use App\CompanyUser;

class OrderController extends Controller
{
    public function __construct(){
        $this->middleware('jwt');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $order = Order::all();
        $companies = Company::select('id', 'name')->get();
        $id = auth()->user()->id;
        $user_company = CompanyUser::join('company', function($j){
                                    $j->on('company.id', '=', 'company_user.company_id');
                                })
                                ->select('company.id')
                                ->where('user_id', '=', $id)->get();


        return response()->json([
            'order' => $order,
            'companies' => $companies,
            'user_company' => $user_company
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            \DB::beginTransaction();
            $order = new Order();
            $order->fill($request->all());
            $order->save();
            \DB::commit();
            
            return response()->json([
                'ok' => true,
                'mensaje' => 'El pedido '.$order->id.' del cliente '.$order->client.' se registro correctamente.'
            ]);
            
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
