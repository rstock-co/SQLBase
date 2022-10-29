import React from 'react';
import SchemaForm from './schema/SchemaForm';
import SchemaForms from './schema/SchemaForms';
import SSchemaForms from './schema/SSchemaForms';

const Tables = () => {

  return (
    <main>
      <SchemaForm />
      {/* <SchemaForms /> */}
      <div className='canvas'>
        <p>"CREATE TABLE"</p>

      </div>
    </main>
  )
};

export default Tables;