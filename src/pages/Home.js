import React from 'react';
import { inject, observer } from 'mobx-react'

const Home = inject('store')(observer(({ store }) => {
    return (
        <div>
            {store.role} - Home
        </div>
    );
}))

export default Home;
