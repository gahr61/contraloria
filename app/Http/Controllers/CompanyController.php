<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::select('id', 'name')->get();

        return response()->json([
            'ok'=>true,
            'company'=>$companies
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
            $company = new Company();
            $company->fill($request->all());
            $company->save();
            \DB::commit();
            
            return response()->json([
                'ok' => true,
                'mensaje' => 'La empresa '.$company->name.' se registro correctamente.'
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
        $company = Company::find($id);

        return response()->json($company);
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
            $company = Company::find($id);
            $company->fill($request->all());
            $company->save();
            \DB::commit();
            
            return response()->json([
                'ok' => true,
                'mensaje' => 'La empresa '.$company->name.' se actualizo correctamente.'
            ]);
            
        }catch(\Exception $e){
            \DB::rollback();
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
            $company = Company::find($id);
            $company->delete();

            \DB::commit();

            return response()->json([
                'ok'=>true,
                'mensaje'=>"La empresa ".$company->name." se elimino con exito."
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            
            return response()->json(['error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()]);
        }
    }
}
