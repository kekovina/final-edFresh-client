import React from 'react';
import { inject, observer } from 'mobx-react'

const Rates = inject('store')(observer(({ store }) => {
    return (
        <div>
            {store.role} - Rates
        </div>
    );
}))

export default Rates;
