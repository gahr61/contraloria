import React from 'react';

const BtnsForm = (props)=>(
	<div className="col-xs-12 form-group btn-form">
		<button tyle="button" className="btn btn-primary btn-save" onClick={props.save}>{props.btnSave}</button>
		<button tyle="button" className="btn btn-info" onClick={props.cancel}>{props.btnCancel}</button>
	</div>
)

export default BtnsForm;