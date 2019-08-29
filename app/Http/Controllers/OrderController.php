<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->company;
        if($id == 'all'){
            $order = Order::join('company', function($j){
                                $j->on('company.id', '=', 'orders.company_id');
                            })
                            ->select('orders.id as id', 'client', 'direction', 'phone', 'company.name as company')
                            ->where('status', 'open')->get();
        }else{
             $order = Order::join('company', function($j){
                                $j->on('company.id', '=', 'orders.company_id');
                            })
                            ->select('orders.id as id', 'client', 'direction', 'phone', 'company.name as company')
                            ->where('company_id', $id)
                            ->where('status', 'open')->get();
        }
       

        return response()->json([
            'order' => $order
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $order = Order::select('id', 'client', 'direction', 'phone', 'company_id')
                        ->where('id',$id)->first();

        return response()->json([
            'order' => $order
        ]);
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
        try{
            \DB::beginTransaction();
            $order = Order::find($id);
            $order->fill($request->all());
            $order->save();
            \DB::commit();
            
            return response()->json([
                'ok' => true,
                'mensaje' => 'El pedido '.$order->id.' del cliente '.$order->client.' se actualizo correctamente.'
            ]);
            
        }catch(\Exception $e){
            \DB::rollback();
            dd($e);
            return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            \DB::beginTransaction();    
            $order = Order::find($id);
            $order->delete();

            \DB::commit();

            return response()->json([
                'ok'=>true,
                'mensaje'=>"La empresa ".$order->id." se elimino con exito."
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            
            return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
        }
    }
}
